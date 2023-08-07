const express = require('express');
const router = express.Router();
const Reservation = require('../services/requests/Reservation');


router.post('/', Reservation.addReservation);
router.get ('/',Reservation.getReservation);

module.exports = router;