const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema(
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
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      default: '',
    },

    email: {
      type: String,
      default: '',
      lowercase: true,
    },

    schoolName: {
      type: String,
      default: '',
    },

    schoolLogo: {
      type: String,
      default: '',
    },

    address: {
      type: String,
      default: '',
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

module.exports = mongoose.model('Admin', adminSchema);