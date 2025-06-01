const Station = require('../models/ChargingStation');

exports.getStations = async (req, res) => {
  const stations = await Station.find({ createdBy: req.user });
  res.json(stations);
};

exports.createStation = async (req, res) => {
  const station = await Station.create({ ...req.body, createdBy: req.user });
  res.status(201).json(station);
};

exports.updateStation = async (req, res) => {
  const station = await Station.findOneAndUpdate(
    { _id: req.params.id, createdBy: req.user },
    req.body,
    { new: true }
  );
  res.json(station);
};

exports.deleteStation = async (req, res) => {
  await Station.findOneAndDelete({ _id: req.params.id, createdBy: req.user });
  res.json({ message: 'Deleted' });
};
