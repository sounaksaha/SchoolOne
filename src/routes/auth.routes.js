const express = require('express');

const controller = require('../controllers/auth.controller');
const {protect} = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/login', controller.login);

router.get('/profile', protect, controller.profile);

module.exports = router;