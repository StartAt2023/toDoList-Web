const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Task = require('../models/Task');
const jwt = require('jsonwebtoken');
const DailyMemo = require('../models/DailyMemo');

function auth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_jwt_secret');
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

// POST /register
router.post('/register', async (req, res) => {
  try {
    const { salutation, gender, birthdate, username, email, phoneCode, phone, password } = req.body;
    // Basic validation (should be improved in production)
    if (!salutation || !gender || !birthdate || !username || !email || !phoneCode || !phone || !password) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
    // Check for existing user
    const exists = await User.findOne({ $or: [{ username }, { email }] });
    if (exists) {
      return res.status(409).json({ error: 'Username or email already exists.' });
    }
    const user = new User({ salutation, gender, birthdate, username, email, phoneCode, phone, password });
    await user.save();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

// POST /login
router.post('/login', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if ((!username && !email) || !password) {
      return res.status(400).json({ error: 'Username/email and password are required.' });
    }
    const query = username ? { username } : { email };
    const user = await User.findOne(query);
    if (!user) {
      return res.status(401).json({ error: 'User not found.' });
    }
    if (user.password !== password) {
      return res.status(401).json({ error: 'Incorrect password.' });
    }
    // JWT
    const token = jwt.sign(
      { id: user._id, username: user.username, email: user.email },
      process.env.JWT_SECRET || 'default_jwt_secret',
      { expiresIn: '7d' }
    );
    res.json({ success: true, token, user: { username: user.username, email: user.email, id: user._id } });
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

// Get all tasks for user
router.get('/tasks', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id }).sort({ dueDate: 1, createdAt: -1 });
    res.json({ success: true, tasks });
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

// Add a new task
router.post('/tasks', auth, async (req, res) => {
  try {
    const { title, assignee, startTime, endTime, description, priority, type, reminderType } = req.body;
    if (!title || !assignee || !startTime || !endTime) return res.status(400).json({ error: 'Title, assignee, start and end time are required' });
    const task = new Task({
      userId: req.user.id,
      title,
      assignee,
      startTime,
      endTime,
      description,
      priority: priority || 2,
      type: type || 'family',
      reminderType: reminderType || 'none',
    });
    await task.save();
    res.json({ success: true, task });
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

// Update a task
router.put('/tasks/:id', auth, async (req, res) => {
  try {
    const { title, assignee, startTime, endTime, description, completed, reminderType } = req.body;
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { title, assignee, startTime, endTime, description, completed, reminderType },
      { new: true }
    );
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json({ success: true, task });
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

// Complete a task (with time check)
router.post('/tasks/:id/complete', auth, async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, userId: req.user.id });
    if (!task) return res.status(404).json({ error: 'Task not found' });
    const now = new Date();
    if (now < task.endTime) {
      if (!req.body.force) {
        return res.status(400).json({ error: 'Task not ended yet', early: true });
      }
    }
    task.completed = true;
    await task.save();
    res.json({ success: true, task });
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

// Delete a task
router.delete('/tasks/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

// 获取某天的 daily memo 及统计
router.get('/daily-memo', auth, async (req, res) => {
  try {
    const { date } = req.query;
    if (!date) return res.status(400).json({ error: 'date required' });
    let memo = await DailyMemo.findOne({ userId: req.user.id, date });
    if (!memo) return res.json({ success: true, tasks: [], total: 0, completed: 0, percent: 0 });
    const total = memo.tasks.length;
    const completed = memo.tasks.filter(t => t.completed).length;
    const percent = total === 0 ? 0 : completed / total;
    res.json({ success: true, tasks: memo.tasks, total, completed, percent });
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});
// 添加 daily memo 任务
router.post('/daily-memo', auth, async (req, res) => {
  try {
    const { date, name } = req.body;
    if (!date || !name) return res.status(400).json({ error: 'date and name required' });
    let memo = await DailyMemo.findOne({ userId: req.user.id, date });
    if (!memo) {
      memo = new DailyMemo({ userId: req.user.id, date, tasks: [{ name }] });
    } else {
      memo.tasks.push({ name });
    }
    await memo.save();
    res.json({ success: true, tasks: memo.tasks });
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});
// 完成/未完成 daily memo 任务
router.put('/daily-memo/:date/:taskIdx', auth, async (req, res) => {
  try {
    const { date, taskIdx } = req.params;
    const { completed } = req.body;
    let memo = await DailyMemo.findOne({ userId: req.user.id, date });
    if (!memo || !memo.tasks[taskIdx]) return res.status(404).json({ error: 'Task not found' });
    memo.tasks[taskIdx].completed = completed;
    await memo.save();
    res.json({ success: true, tasks: memo.tasks });
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});
// 删除 daily memo 任务
router.delete('/daily-memo/:date/:taskIdx', auth, async (req, res) => {
  try {
    const { date, taskIdx } = req.params;
    let memo = await DailyMemo.findOne({ userId: req.user.id, date });
    if (!memo || !memo.tasks[taskIdx]) return res.status(404).json({ error: 'Task not found' });
    memo.tasks.splice(taskIdx, 1);
    await memo.save();
    res.json({ success: true, tasks: memo.tasks });
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

// 获取所有 daily memo 完成率
router.get('/daily-memo/all', auth, async (req, res) => {
  try {
    const memos = await DailyMemo.find({ userId: req.user.id }).sort({ date: 1 });
    const stats = memos.map(memo => {
      const total = memo.tasks.length;
      const completed = memo.tasks.filter(t => t.completed).length;
      const percent = total === 0 ? 0 : completed / total;
      return { date: memo.date, percent, total, completed };
    });
    res.json({ success: true, stats });
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

// 获取当前用户信息
router.get('/profile', auth, async (req, res) => {
  try {
    console.log('JWT decoded user:', req.user); // 调试信息
    const user = await User.findById(req.user.id).select('username email');
    console.log('Database user:', user); // 调试信息
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ success: true, user: { username: user.username, email: user.email } });
  } catch (err) {
    console.error('Profile API error:', err); // 调试信息
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

module.exports = router;
