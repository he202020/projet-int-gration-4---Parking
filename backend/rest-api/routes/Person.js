
const express = require('express');
const router = express.Router();
const Person = require('../services/requests/Person');



router.get ('/', Person.getPerson);
router.post('/', Person.postPerson);

module.exports = router;