const mongoose = require('mongoose');
const {ROLES} = require('../constants/roles');

const userSchema = new mongoose.Schema(
  {
    schoolCode: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    role: {
      type: String,
      enum: Object.values(ROLES),
      required: true,
      index: true,
    },

    loginId: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    phone: {
      type: String,
      default: '',
      trim: true,
    },

    email: {
      type: String,
      default: '',
      lowercase: true,
      trim: true,
    },

    permissions: {
      type: [String],
      default: [],
    },

    profileRef: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
      refPath: 'profileModel',
    },

    profileModel: {
      type: String,
      enum: ['Admin', 'TeacherStaff', 'Student', 'Driver'],
      default: null,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    mustChangePassword: {
      type: Boolean,
      default: true,
    },

    lastLoginAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.index(
  {
    schoolCode: 1,
    role: 1,
    loginId: 1,
  },
  {
    unique: true,
  },
);

module.exports = mongoose.model('User', userSchema);