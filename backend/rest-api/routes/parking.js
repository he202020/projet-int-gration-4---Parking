const express = require('express');
const router = express.Router();
const parking = require('../services/requests/parking');

router.get('/', parking.getParking);
router.get('/:query', parking.searchParking);

module.exports = router;