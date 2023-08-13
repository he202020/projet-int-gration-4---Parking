
const express = require('express');
const router = express.Router();
const Parking = require('../services/requests/parking');


//router.post('/', Reservation.addReservation);
router.get ('/',Parking.getParking);

module.exports = router;