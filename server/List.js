const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  isPublic: { type: Boolean, default: false },
  cars: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Car' }]
});

const List = mongoose.model('List', listSchema);

module.exports = List;
