const User = require('../models/User');
const Driver = require('../models/Driver');
const AppError = require('../utils/AppError');
const {hashPassword} = require('../utils/password');
const {ROLES} = require('../constants/roles');

const createDriver = async payload => {
  const schoolCode = payload.schoolCode.toUpperCase();

  let user = null;

  if (payload.appLoginEnabled) {
    const existingUser = await User.findOne({
      schoolCode,
      role: ROLES.DRIVER,
      loginId: payload.login.loginId.toLowerCase(),
    });

    if (existingUser) {
      throw new AppError('Driver login already exists', 409);
    }

    const hashedPassword = await hashPassword(payload.login.password);

    user = await User.create({
      schoolCode,
      name: payload.name,
      role: ROLES.DRIVER,
      loginId: payload.login.loginId.toLowerCase(),
      password: hashedPassword,
      phone: payload.phone,
      email: payload.email,
      permissions: payload.permissions || [],
      profileModel: 'Driver',
      isActive: true,
      mustChangePassword: true,
    });
  }

  const driver = await Driver.create({
    schoolCode,
    user: user?._id || null,

    name: payload.name,
    employeeId: payload.employeeId,
    phone: payload.phone,
    email: payload.email,

    licenseNumber: payload.licenseNumber,
    emergencyContact: payload.emergencyContact,
    vehicleNumber: payload.vehicleNumber,
    routeName: payload.routeName,
    joiningDate: payload.joiningDate,

    appLoginEnabled: Boolean(payload.appLoginEnabled),
  });

  if (user) {
    user.profileRef = driver._id;
    await user.save();
  }

  return {
    driver,
    login: user
      ? {
          id: user._id,
          role: user.role,
          loginId: user.loginId,
        }
      : null,
  };
};

const getDriverList = async schoolCode => {
  return Driver.find({
    schoolCode: schoolCode.toUpperCase(),
  })
    .populate('user', '-password')
    .sort({createdAt: -1});
};

module.exports = {
  createDriver,
  getDriverList,
};