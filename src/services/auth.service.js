const User = require('../models/User');
const AppError = require('../utils/AppError');
const {comparePassword} = require('../utils/password');
const {generateToken} = require('../utils/jwt');

const loginUser = async ({schoolCode, role, loginId, password}) => {
  const user = await User.findOne({
    schoolCode: schoolCode.toUpperCase(),
    role,
    loginId: loginId.toLowerCase(),
  }).select('+password');

  if (!user) {
    throw new AppError('Invalid credentials', 401);
  }

  if (!user.isActive) {
    throw new AppError('Account is inactive', 403);
  }

  const isValidPassword = await comparePassword(password, user.password);

  if (!isValidPassword) {
    throw new AppError('Invalid credentials', 401);
  }

  user.lastLoginAt = new Date();
  await user.save();

  const token = generateToken({
    userId: user._id,
    role: user.role,
    schoolCode: user.schoolCode,
  });

  return {
    token,
    user: {
      id: user._id,
      schoolCode: user.schoolCode,
      name: user.name,
      role: user.role,
      loginId: user.loginId,
      phone: user.phone,
      email: user.email,
      permissions: user.permissions,
      profileRef: user.profileRef,
      profileModel: user.profileModel,
      mustChangePassword: user.mustChangePassword,
    },
  };
};

module.exports = {
  loginUser,
};