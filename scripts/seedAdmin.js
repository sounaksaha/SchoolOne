const mongoose = require('mongoose');

const connectDB = require('../src/config/db');
const User = require('../src/models/User');
const Admin = require('../src/models/Admin');
const {ROLES} = require('../src/constants/roles');
const {hashPassword} = require('../src/utils/password');

const seedAdmin = async () => {
  try {
    await connectDB();

    const schoolCode = 'SCH001';
    const loginId = 'admin@test.com';

    const existingAdminUser = await User.findOne({
      schoolCode,
      role: ROLES.ADMIN,
      loginId,
    });

    if (existingAdminUser) {
      console.log('Admin already exists');
      process.exit(0);
    }

    const hashedPassword = await hashPassword('123456');

    const user = await User.create({
      schoolCode,
      name: 'School Admin',
      role: ROLES.ADMIN,
      loginId,
      password: hashedPassword,
      phone: '9876543210',
      email: loginId,
      permissions: ['all'],
      profileModel: 'Admin',
      isActive: true,
      mustChangePassword: false,
    });

    const admin = await Admin.create({
      schoolCode,
      user: user._id,
      name: 'School Admin',
      phone: '9876543210',
      email: loginId,
      schoolName: 'SchoolOne Demo School',
      schoolLogo: '',
      address: 'Kolkata, West Bengal',
      status: 'Active',
    });

    user.profileRef = admin._id;
    await user.save();

    console.log('Admin seeded successfully');
    console.log({
      schoolCode,
      role: ROLES.ADMIN,
      loginId,
      password: '123456',
    });

    process.exit(0);
  } catch (error) {
    console.error('Seed admin failed:', error.message);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
  }
};

seedAdmin();