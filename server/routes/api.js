const express = require('express');
const router = express.Router();

router.use('/clients', require('./clients'));

module.exports = router;
