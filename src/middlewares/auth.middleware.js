const User = require('../models/User');
const AppError = require('../utils/AppError');
const asyncHandler = require('../utils/asyncHandler');
const {verifyToken} = require('../utils/jwt');

const protect = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new AppError('Token missing', 401);
  }

  const token = authHeader.split(' ')[1];
  const decoded = verifyToken(token);

  const user = await User.findById(decoded.userId);

  if (!user || !user.isActive) {
    throw new AppError('Invalid or inactive user', 401);
  }

  req.user = user;

  next();
});

const allowRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError('Access denied for this role', 403));
    }

    next();
  };
};

module.exports = {
  protect,
  allowRoles,
};