const express = require('express');

const controller = require('../controllers/driver.controller');
const {protect, allowRoles} = require('../middlewares/auth.middleware');
const {ROLES} = require('../constants/roles');

const router = express.Router();

router.use(protect);

router.post(
  '/',
  allowRoles(ROLES.ADMIN),
  controller.createDriver,
);

router.get(
  '/',
  allowRoles(ROLES.ADMIN),
  controller.getDriverList,
);

module.exports = router;