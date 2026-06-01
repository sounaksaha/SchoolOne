const User = require('../models/User');
const TeacherStaff = require('../models/TeacherStaff');
const AppError = require('../utils/AppError');
const {hashPassword} = require('../utils/password');
const {ROLES} = require('../constants/roles');
const { default: mongoose } = require('mongoose');

const createTeacherStaff = async payload => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const schoolCode = payload.schoolCode.toUpperCase();

    const loginRole = payload.roleType === 'Teacher' ? ROLES.TEACHER : ROLES.STAFF;

    const existingEmployee = await TeacherStaff.findOne({
      schoolCode,
      employeeId: payload.employeeId,
    }).session(session);

    if (existingEmployee) {
      throw new AppError('Employee ID already exists', 409);
    }

    let user = null;

    if (payload.appLoginEnabled) {
      const existingUser = await User.findOne({
        schoolCode,
        role: loginRole,
        loginId: payload.login.loginId.toLowerCase(),
      }).session(session);

      if (existingUser) {
        throw new AppError('Login already exists', 409);
      }

      const hashedPassword = await hashPassword(payload.login.password);

      const createdUsers = await User.create(
        [
          {
            schoolCode,
            name: payload.name,
            role: loginRole,
            loginId: payload.login.loginId.toLowerCase(),
            password: hashedPassword,
            phone: payload.phone,
            email: payload.email,
            permissions: payload.permissions || [],
            profileModel: 'TeacherStaff',
            isActive: true,
            mustChangePassword: true,
          },
        ],
        {session},
      );

      user = createdUsers[0];
    }

    const createdProfiles = await TeacherStaff.create(
      [
        {
          schoolCode,
          user: user?._id || null,

          name: payload.name,
          employeeId: payload.employeeId,
          roleType: payload.roleType,
          staffType: payload.staffType,
          department: payload.department,
          subjectDepartment: payload.subjectDepartment,
          assignedClass: payload.assignedClass,
          subjects: payload.subjects || [],

          phone: payload.phone,
          email: payload.email,
          joiningDate: payload.joiningDate,

          appLoginEnabled: Boolean(payload.appLoginEnabled),
        },
      ],
      {session},
    );

    const profile = createdProfiles[0];

    if (user) {
      user.profileRef = profile._id;
      await user.save({session});
    }

    await session.commitTransaction();

    return {
      profile,
      login: user
        ? {
            id: user._id,
            role: user.role,
            loginId: user.loginId,
          }
        : null,
    };
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};


const getTeacherStaffList = async ({schoolCode, query}) => {
  const {
    search = '',
    roleType = '',
    page = 1,
    limit = 10,
  } = query;

  const pageNumber = Math.max(Number(page) || 1, 1);
  const limitNumber = Math.max(Number(limit) || 10, 1);
  const skip = (pageNumber - 1) * limitNumber;

  const filter = {
    schoolCode: schoolCode.toUpperCase(),
  };

  if (roleType) {
    filter.roleType = roleType;
  }

  if (search) {
    const searchRegex = new RegExp(search.trim(), 'i');

    const matchingUsers = await User.find({
      schoolCode: schoolCode.toUpperCase(),
      loginId: searchRegex,
    }).select('_id');

    const matchingUserIds = matchingUsers.map(user => user._id);

    filter.$or = [
      {name: searchRegex},
      {email: searchRegex},
      {employeeId: searchRegex},
      {user: {$in: matchingUserIds}},
    ];
  }

  const [data, total] = await Promise.all([
    TeacherStaff.find(filter)
      .populate('user', '-password')
      .sort({createdAt: -1})
      .skip(skip)
      .limit(limitNumber),

    TeacherStaff.countDocuments(filter),
  ]);

  const totalPages = Math.ceil(total / limitNumber);

  return {
    data,
    pagination: {
      total,
      page: pageNumber,
      limit: limitNumber,
      totalPages,
      hasNextPage: pageNumber < totalPages,
      hasPrevPage: pageNumber > 1,
    },
  };
};

module.exports = {
  createTeacherStaff,
  getTeacherStaffList,
};