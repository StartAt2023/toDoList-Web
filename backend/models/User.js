const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  salutation: { type: String, required: true },
  gender: { type: String, required: true },
  birthdate: { type: Date, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  phoneCode: { type: String, required: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema); 