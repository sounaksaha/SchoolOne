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
  const result = await service.getDriverList(req.user.schoolCode);

  res.json({
    success: true,
    data: result,
  });
});

module.exports = {
  createDriver,
  getDriverList,
};