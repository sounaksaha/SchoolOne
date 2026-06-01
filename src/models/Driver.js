const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema(
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

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      default: '',
      lowercase: true,
    },

    licenseNumber: {
      type: String,
      default: '',
    },

    emergencyContact: {
      type: String,
      default: '',
    },

    vehicleNumber: {
      type: String,
      default: '',
    },

    routeName: {
      type: String,
      default: '',
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

driverSchema.index(
  {
    schoolCode: 1,
    employeeId: 1,
  },
  {
    unique: true,
    sparse: true,
  },
);

module.exports = mongoose.model('Driver', driverSchema);