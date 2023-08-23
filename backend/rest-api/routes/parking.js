
const express = require('express');
const router = express.Router();
const Parking = require('../services/requests/parking');
const {authenticate} = require("../services/requests/auth");


//router.post('/', Reservation.addReservation);
router.get ('/', authenticate, Parking.getParking);

module.exports = router;