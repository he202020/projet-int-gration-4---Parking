const express = require('express');
const router = express.Router();
const signin = require('../services/requests/signin');

router.post('/', signin.login);

module.exports = router;