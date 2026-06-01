const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
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

    studentName: {
      type: String,
      required: true,
      trim: true,
    },

    admissionNo: {
      type: String,
      default: '',
      trim: true,
    },

    gender: {
      type: String,
      default: '',
    },

    dateOfBirth: {
      type: String,
      default: '',
    },

    bloodGroup: {
      type: String,
      default: '',
    },

    className: {
      type: String,
      required: true,
    },

    section: {
      type: String,
      required: true,
    },

    rollNumber: {
      type: String,
      default: '',
    },

    academicYear: {
      type: String,
      default: '',
    },

    parent: {
      name: {
        type: String,
        required: true,
      },

      phone: {
        type: String,
        required: true,
      },

      email: {
        type: String,
        default: '',
        lowercase: true,
      },

      alternatePhone: {
        type: String,
        default: '',
      },

      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null,
      },
    },

    address: {
      type: String,
      default: '',
    },

    transport: {
      required: {
        type: Boolean,
        default: false,
      },

      routeName: {
        type: String,
        default: '',
      },

      pickupPoint: {
        type: String,
        default: '',
      },
    },

    status: {
      type: String,
      enum: ['Active', 'Inactive', 'Promoted', 'Transferred'],
      default: 'Active',
    },
  },
  {
    timestamps: true,
  },
);

studentSchema.index(
  {
    schoolCode: 1,
    admissionNo: 1,
  },
  {
    unique: true,
    sparse: true,
  },
);

module.exports = mongoose.model('Student', studentSchema);