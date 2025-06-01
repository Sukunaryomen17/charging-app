const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
  getStations,
  createStation,
  updateStation,
  deleteStation
} = require('../controllers/stationController');

router.use(auth);
router.get('/', getStations);
router.post('/', createStation);
router.put('/:id', updateStation);
router.delete('/:id', deleteStation);

module.exports = router;
