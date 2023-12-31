const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  contact: { type: Number },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  password: { type: String, required: true },
  resetLink: { type: String, default: '' },
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next();

  const hash = bcrypt.hashSync(this.password, 8);
  this.password = hash;

  return next();
});

userSchema.methods.checkPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('user', userSchema);
