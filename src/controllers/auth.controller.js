const asyncHandler = require('../utils/asyncHandler');
const service = require('../services/auth.service');

const login = asyncHandler(async (req, res) => {
  const result = await service.loginUser(req.body);

  res.json({
    success: true,
    message: 'Login successful',
    data: result,
  });
});

const profile = asyncHandler(async (req, res) => {
  res.json({
    success: true,
    data: {
      id: req.user._id,
      schoolCode: req.user.schoolCode,
      name: req.user.name,
      role: req.user.role,
      loginId: req.user.loginId,
      phone: req.user.phone,
      email: req.user.email,
      permissions: req.user.permissions,
      profileRef: req.user.profileRef,
      profileModel: req.user.profileModel,
      mustChangePassword: req.user.mustChangePassword,
    },
  });
});

module.exports = {
  login,
  profile,
};