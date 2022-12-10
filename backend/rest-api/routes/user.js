const express = require('express');
const router = express.Router();
const user = require('../services/requests/user');
const token = require('../services/token');

router.get('/', token.authenticateToken, user.getUserData);

module.exports = router;