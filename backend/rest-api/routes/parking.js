
const express = require('express');
const router = express.Router();
const Parking = require('../services/requests/Parking');


//router.post('/', Reservation.addReservation);
router.get ('/',Parking.getParking);

module.exports = router;