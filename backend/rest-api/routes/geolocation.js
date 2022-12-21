const express = require('express');
const router = express.Router();
const geolocation = require('../services/requests/geolocation');

router.post('/', geolocation.getDistanceFromParking);

module.exports = router;