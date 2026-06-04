const asyncHandler = require('../utils/asyncHandler');
const service = require('../services/driver.service');

const createDriver = asyncHandler(async (req, res) => {
  const result = await service.createDriver(req.body);

  res.status(201).json({
    success: true,
    message: 'Driver created successfully',
    data: result,
  });
});

const getDriverList = asyncHandler(async (req, res) => {
  const result = await service.getDriverList({
    schoolCode: req.user.schoolCode,
    query: req.query,
  });

  res.json({
    success: true,
    message: 'Driver list fetched successfully',
    data: result.data,
    pagination: result.pagination,
  });
});

module.exports = {
  createDriver,
  getDriverList,
};