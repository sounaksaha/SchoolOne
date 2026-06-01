const asyncHandler = require('../utils/asyncHandler');
const service = require('../services/student.service');

const createStudent = asyncHandler(async (req, res) => {
  const result = await service.createStudent(req.body);

  res.status(201).json({
    success: true,
    message: 'Student created successfully',
    data: result,
  });
});

const getStudentList = asyncHandler(async (req, res) => {
  const result = await service.getStudentList(req.user.schoolCode);

  res.json({
    success: true,
    data: result,
  });
});

module.exports = {
  createStudent,
  getStudentList,
};