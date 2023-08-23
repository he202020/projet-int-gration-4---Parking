const express = require('express');
const router = express.Router();
const Reservation = require('../services/requests/Reservation');
const {authenticate} = require("../services/requests/auth");


router.post('/', authenticate, Reservation.addReservation);
router.get ('/', authenticate, Reservation.getReservation);

module.exports = router;