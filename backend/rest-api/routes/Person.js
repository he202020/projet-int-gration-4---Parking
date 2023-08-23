
const express = require('express');
const router = express.Router();
const Person = require('../services/requests/Person');
const {authenticate, hashPassword} = require("../services/requests/auth");



router.get ('/', authenticate, Person.getPerson);
router.post('/', hashPassword, Person.postPerson);
router.post('/login',Person.login);

module.exports = router;