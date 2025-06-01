const mongoose = require('mongoose');

const stationSchema = new mongoose.Schema({
  name: String,
  location: {
    latitude: Number,
    longitude: Number
  },
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
  powerOutput: Number,
  connectorType: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('ChargingStation', stationSchema);
