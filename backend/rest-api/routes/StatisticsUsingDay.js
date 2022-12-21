const express = require('express');
const router = express.Router();
const NumberCars = require('../services/requests/StatisticsUsingDay')

router.get('/',NumberCars.getNumberCar);

module.exports = router;