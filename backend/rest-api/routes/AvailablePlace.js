const express = require('express');
const router = express.Router();
const AvailablePlace = require('../services/requests/AvailablePlace')

router.get('/',AvailablePlace.getAvailablePlace);

module.exports = router;