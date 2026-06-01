const express = require('express');

const controller = require('../controllers/student.controller');
const {protect, allowRoles} = require('../middlewares/auth.middleware');
const {ROLES} = require('../constants/roles');

const router = express.Router();

router.use(protect);

router.post(
  '/',
  allowRoles(ROLES.ADMIN),
  controller.createStudent,
);

router.get(
  '/',
  allowRoles(ROLES.ADMIN, ROLES.TEACHER),
  controller.getStudentList,
);

module.exports = router;