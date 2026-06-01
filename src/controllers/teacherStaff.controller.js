const asyncHandler = require('../utils/asyncHandler');
const service = require('../services/teacherStaff.service');

const createTeacherStaff = asyncHandler(async (req, res) => {
  const payload = {
    ...req.body,
    schoolCode: req.user.schoolCode,
  };

  const result = await service.createTeacherStaff(payload);

  res.status(201).json({
    success: true,
    message: 'Teacher/staff created successfully',
    data: result,
  });
});

const getTeacherStaffList = asyncHandler(async (req, res) => {
  const result = await service.getTeacherStaffList({
    schoolCode: req.user.schoolCode,
    query: req.query,
  });

  res.json({
    success: true,
    message: 'Teacher/staff list fetched successfully',
    data: result.data,
    pagination: result.pagination,
  });
});

module.exports = {
  createTeacherStaff,
  getTeacherStaffList,
};