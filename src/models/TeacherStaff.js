const mongoose = require('mongoose');

const teacherStaffSchema = new mongoose.Schema(
  {
    schoolCode: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
      index: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    employeeId: {
      type: String,
      default: '',
      trim: true,
    },

    roleType: {
      type: String,
      enum: ['Teacher', 'Staff'],
      required: true,
    },

    staffType: {
      type: String,
      default: '',
      trim: true,
    },

    department: {
      type: String,
      default: '',
      trim: true,
    },

    subjectDepartment: {
      type: String,
      default: '',
      trim: true,
    },

    assignedClass: {
      type: String,
      default: '',
    },

    subjects: {
      type: [String],
      default: [],
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      default: '',
      lowercase: true,
      trim: true,
    },

    joiningDate: {
      type: String,
      default: '',
    },

    appLoginEnabled: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: ['Active', 'Inactive'],
      default: 'Active',
    },
  },
  {
    timestamps: true,
  },
);

teacherStaffSchema.index(
  {
    schoolCode: 1,
    employeeId: 1,
  },
  {
    unique: true,
    sparse: true,
  },
);

module.exports = mongoose.model('TeacherStaff', teacherStaffSchema);