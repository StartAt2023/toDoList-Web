const express = require('express');
const router = express.Router();
const Focus = require('../models/Focus');
const auth = require('../middleware/auth');

// 获取用户的Focus状态
router.get('/status', auth, async (req, res) => {
  try {
    let focus = await Focus.findOne({ 
      userId: req.user.id, 
      status: { $in: ['idle', 'running', 'paused'] } 
    }).sort({ createdAt: -1 });

    if (!focus) {
      return res.json({ 
        status: 'idle', 
        duration: 0, 
        totalFocusTime: 0, 
        remainingTime: 0,
        medals: []
      });
    }

    let remainingTime = focus.duration - focus.totalFocusTime;
    if (focus.status === 'running' && focus.startTime) {
      const elapsed = Math.floor((Date.now() - focus.startTime.getTime()) / 60000);
      remainingTime = Math.max(0, focus.duration - elapsed);
    }

    res.json({
      status: focus.status,
      duration: focus.duration,
      totalFocusTime: focus.totalFocusTime,
      remainingTime,
      startTime: focus.startTime,
      medals: focus.medals
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// 开始Focus
router.post('/start', auth, async (req, res) => {
  try {
    const { duration } = req.body;
    
    if (!duration || duration < 30 || duration > 180) {
      return res.status(400).json({ message: 'Duration must be between 30 and 180 minutes' });
    }

    // 检查是否有正在进行的Focus
    let existingFocus = await Focus.findOne({ 
      userId: req.user.id, 
      status: { $in: ['running', 'paused'] } 
    });

    if (existingFocus) {
      return res.status(400).json({ message: 'You already have an active focus session' });
    }

    const focus = new Focus({
      userId: req.user.id,
      duration,
      startTime: new Date(),
      status: 'running'
    });

    await focus.save();
    res.json({ 
      message: 'Focus session started', 
      focus: {
        status: focus.status,
        duration: focus.duration,
        startTime: focus.startTime,
        remainingTime: duration
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// 暂停Focus
router.post('/pause', auth, async (req, res) => {
  try {
    const focus = await Focus.findOne({ 
      userId: req.user.id, 
      status: 'running' 
    });

    if (!focus) {
      return res.status(400).json({ message: 'No active focus session found' });
    }

    const elapsed = Math.floor((Date.now() - focus.startTime.getTime()) / 60000);
    focus.totalFocusTime += elapsed;
    focus.status = 'paused';
    focus.startTime = null;
    await focus.save();

    res.json({ 
      message: 'Focus session paused', 
      totalFocusTime: focus.totalFocusTime,
      remainingTime: Math.max(0, focus.duration - focus.totalFocusTime)
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// 恢复Focus
router.post('/resume', auth, async (req, res) => {
  try {
    const focus = await Focus.findOne({ 
      userId: req.user.id, 
      status: 'paused' 
    });

    if (!focus) {
      return res.status(400).json({ message: 'No paused focus session found' });
    }

    focus.status = 'running';
    focus.startTime = new Date();
    await focus.save();

    res.json({ 
      message: 'Focus session resumed', 
      remainingTime: Math.max(0, focus.duration - focus.totalFocusTime)
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// 终止Focus
router.post('/terminate', auth, async (req, res) => {
  try {
    const focus = await Focus.findOne({ 
      userId: req.user.id, 
      status: { $in: ['running', 'paused'] } 
    });

    if (!focus) {
      return res.status(400).json({ message: 'No active focus session found' });
    }

    if (focus.status === 'running') {
      const elapsed = Math.floor((Date.now() - focus.startTime.getTime()) / 60000);
      focus.totalFocusTime += elapsed;
    }

    focus.status = 'terminated';
    focus.endTime = new Date();
    await focus.save();

    res.json({ 
      message: 'Focus session terminated', 
      totalFocusTime: focus.totalFocusTime
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// 完成Focus
router.post('/complete', auth, async (req, res) => {
  try {
    const focus = await Focus.findOne({ 
      userId: req.user.id, 
      status: 'running' 
    });

    if (!focus) {
      return res.status(400).json({ message: 'No active focus session found' });
    }

    const elapsed = Math.floor((Date.now() - focus.startTime.getTime()) / 60000);
    focus.totalFocusTime += elapsed;
    focus.status = 'completed';
    focus.endTime = new Date();

    // 检查并授予奖章
    const totalTime = focus.totalFocusTime;
    const medals = [];
    
    if (totalTime >= 30 && !focus.medals.find(m => m.type === 'bronze')) {
      medals.push({ type: 'bronze', duration: 30, earnedAt: new Date() });
    }
    if (totalTime >= 60 && !focus.medals.find(m => m.type === 'silver')) {
      medals.push({ type: 'silver', duration: 60, earnedAt: new Date() });
    }
    if (totalTime >= 120 && !focus.medals.find(m => m.type === 'gold')) {
      medals.push({ type: 'gold', duration: 120, earnedAt: new Date() });
    }
    if (totalTime >= 180 && !focus.medals.find(m => m.type === 'platinum')) {
      medals.push({ type: 'platinum', duration: 180, earnedAt: new Date() });
    }

    focus.medals.push(...medals);
    await focus.save();

    res.json({ 
      message: 'Focus session completed!', 
      totalFocusTime: focus.totalFocusTime,
      newMedals: medals
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// 获取用户的奖章历史
router.get('/medals', auth, async (req, res) => {
  try {
    const focusSessions = await Focus.find({ 
      userId: req.user.id,
      'medals.0': { $exists: true }
    }).sort({ createdAt: -1 });

    const allMedals = focusSessions.reduce((acc, session) => {
      return acc.concat(session.medals);
    }, []);

    res.json({ medals: allMedals });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// 获取Focus历史记录
router.get('/history', auth, async (req, res) => {
  try {
    const focusSessions = await Focus.find({ 
      userId: req.user.id 
    }).sort({ createdAt: -1 }).limit(20);

    res.json({ sessions: focusSessions });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 