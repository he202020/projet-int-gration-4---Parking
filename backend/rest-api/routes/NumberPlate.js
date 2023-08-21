
const express = require('express');
const router = express.Router();
const NumberPlate = require('../services/requests/NumberPlate');


//router.post('/', Reservation.addReservation);
router.get ('/',NumberPlate.getNumberPlate);
router.post ('/',NumberPlate.addNumberPlate);

module.exports = router;