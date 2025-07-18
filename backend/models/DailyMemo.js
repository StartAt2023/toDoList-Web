const mongoose = require('mongoose');

const dailyMemoTaskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

const dailyMemoSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: String, required: true }, // YYYY-MM-DD
  tasks: [dailyMemoTaskSchema],
  createdAt: { type: Date, default: Date.now },
});

dailyMemoSchema.index({ userId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('DailyMemo', dailyMemoSchema); 