const express = require('express');

const userCtrl = require('../controllers/userController');
const authCtrl = require('../controllers/authController');

const router = express.Router();

router.get('/current', userCtrl.getData);

router.post('/auth', authCtrl.authenticate);

module.exports = router;
