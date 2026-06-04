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
  const result = await service.getStudentList({
    schoolCode: req.user.schoolCode,
    query: req.query,
  });

  res.json({
    success: true,
    message: 'Student list fetched successfully',
    data: result.data,
    pagination: result.pagination,
  });
});

module.exports = {
  createStudent,
  getStudentList,
};