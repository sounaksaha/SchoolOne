const User = require('../models/User');
const Student = require('../models/Student');
const AppError = require('../utils/AppError');
const {hashPassword} = require('../utils/password');
const {ROLES} = require('../constants/roles');

const createStudent = async payload => {
  const schoolCode = payload.schoolCode.toUpperCase();

  let parentUser = null;
  let studentUser = null;

  if (payload.createParentLogin) {
    const parentLoginId = payload.parentLogin.loginId.toLowerCase();

    const existingParent = await User.findOne({
      schoolCode,
      role: ROLES.PARENT,
      loginId: parentLoginId,
    });

    if (existingParent) {
      parentUser = existingParent;
    } else {
      const hashedPassword = await hashPassword(payload.parentLogin.password);

      parentUser = await User.create({
        schoolCode,
        name: payload.parent.name,
        role: ROLES.PARENT,
        loginId: parentLoginId,
        password: hashedPassword,
        phone: payload.parent.phone,
        email: payload.parent.email,
        permissions: [],
        profileModel: 'Student',
        isActive: true,
        mustChangePassword: true,
      });
    }
  }

  if (payload.createStudentLogin) {
    const studentLoginId = payload.studentLogin.loginId.toLowerCase();

    const existingStudentUser = await User.findOne({
      schoolCode,
      role: ROLES.STUDENT,
      loginId: studentLoginId,
    });

    if (existingStudentUser) {
      throw new AppError('Student login already exists', 409);
    }

    const hashedPassword = await hashPassword(payload.studentLogin.password);

    studentUser = await User.create({
      schoolCode,
      name: payload.studentName,
      role: ROLES.STUDENT,
      loginId: studentLoginId,
      password: hashedPassword,
      phone: '',
      email: '',
      permissions: [],
      profileModel: 'Student',
      isActive: true,
      mustChangePassword: true,
    });
  }

  const student = await Student.create({
    schoolCode,

    user: studentUser?._id || null,

    studentName: payload.studentName,
    admissionNo: payload.admissionNo,
    gender: payload.gender,
    dateOfBirth: payload.dateOfBirth,
    bloodGroup: payload.bloodGroup,

    className: payload.className,
    section: payload.section,
    rollNumber: payload.rollNumber,
    academicYear: payload.academicYear,

    parent: {
      name: payload.parent.name,
      phone: payload.parent.phone,
      email: payload.parent.email,
      alternatePhone: payload.parent.alternatePhone,
      user: parentUser?._id || null,
    },

    address: payload.address,

    transport: {
      required: payload.transport?.required || false,
      routeName: payload.transport?.routeName || '',
      pickupPoint: payload.transport?.pickupPoint || '',
    },
  });

  if (parentUser) {
    parentUser.profileRef = student._id;
    await parentUser.save();
  }

  if (studentUser) {
    studentUser.profileRef = student._id;
    await studentUser.save();
  }

  return {
    student,
    parentLogin: parentUser
      ? {
          id: parentUser._id,
          role: parentUser.role,
          loginId: parentUser.loginId,
        }
      : null,
    studentLogin: studentUser
      ? {
          id: studentUser._id,
          role: studentUser.role,
          loginId: studentUser.loginId,
        }
      : null,
  };
};

const getStudentList = async schoolCode => {
  return Student.find({
    schoolCode: schoolCode.toUpperCase(),
  })
    .populate('user', '-password')
    .populate('parent.user', '-password')
    .sort({createdAt: -1});
};

module.exports = {
  createStudent,
  getStudentList,
};