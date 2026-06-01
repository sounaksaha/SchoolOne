const express = require('express');

const controller = require('../controllers/teacherStaff.controller');
const {protect, allowRoles} = require('../middlewares/auth.middleware');
const {ROLES} = require('../constants/roles');

const router = express.Router();

router.use(protect);

router.post(
  '/',
  allowRoles(ROLES.ADMIN),
  controller.createTeacherStaff,
);

router.get(
  '/',
  allowRoles(ROLES.ADMIN),
  controller.getTeacherStaffList,
);

module.exports = router;