const express = require('express');
const router = express.Router();
const signup = require('../services/requests/signup');

router.post('/', signup.postUserData);

module.exports = router;