
const express = require('express');
const router = express.Router();
const NumberPlate = require('../services/requests/NumberPlate');
const {authenticate} = require("../services/requests/auth");


//router.post('/', Reservation.addReservation);
router.get ('/', authenticate, NumberPlate.getNumberPlate);
router.post ('/', authenticate, NumberPlate.addNumberPlate);

module.exports = router;