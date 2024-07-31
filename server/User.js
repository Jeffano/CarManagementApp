const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true},
  createdAt: { type: String, required: true},
  cars: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Car' }],
  lists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'List' }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
