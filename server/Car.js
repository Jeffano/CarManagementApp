const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  make: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  brand: { type: String, required: true },
  size: { type: String },
  color: { type: String },
  additionalDetails: { type: String },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
