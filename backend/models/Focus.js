const mongoose = require('mongoose');

const focusSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  duration: { 
    type: Number, 
    required: true, 
    min: 30, 
    max: 180 
  }, // 分钟
  startTime: { 
    type: Date, 
    default: null 
  },
  endTime: { 
    type: Date, 
    default: null 
  },
  status: { 
    type: String, 
    enum: ['idle', 'running', 'paused', 'completed', 'terminated'], 
    default: 'idle' 
  },
  totalFocusTime: { 
    type: Number, 
    default: 0 
  }, // 实际专注时间（分钟）
  medals: [{
    type: { 
      type: String, 
      enum: ['bronze', 'silver', 'gold', 'platinum'], 
      required: true 
    },
    earnedAt: { 
      type: Date, 
      default: Date.now 
    },
    duration: { 
      type: Number, 
      required: true 
    } // 获得奖章时的专注时长
  }],
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
});

// 更新时间戳
focusSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model('Focus', focusSchema); 