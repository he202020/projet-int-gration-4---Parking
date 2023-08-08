
const express = require('express');
const router = express.Router();
const NumberPlate = require('../services/requests/NumberPlate');


//router.post('/', Reservation.addReservation);
router.get ('/',NumberPlate.getNumberPlate);

module.exports = router;