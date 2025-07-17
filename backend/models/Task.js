const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const taskSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true }, // 显式指定 _id
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  taskId: { type: Number },
  title: { type: String, required: true },
  assignee: { type: String, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  description: { type: String },
  completed: { type: Boolean, default: false },
  priority: { type: Number, default: 2 },
  type: { type: String, enum: ['family', 'study', 'work', 'other'], default: 'family' },
  dueDate: { type: Date },
  reminderType: { type: String, enum: ['none', 'email'], default: 'none' },
  createdAt: { type: Date, default: Date.now },
});

taskSchema.plugin(AutoIncrement, {
  inc_field: 'taskId',
  id: 'task_seq_by_user',  // 设置 sequence 的唯一 ID（必须）
  refFields: ['userId']    // 分组字段（例如每个 userId 从 1 开始编号）
});

module.exports = mongoose.model('Task', taskSchema);
