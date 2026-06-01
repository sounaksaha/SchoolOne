const mongoose = require('mongoose');
const env = require('./env');

const connectDB = async () => {
  if (!env.MONGO_URI) {
    throw new Error('MONGO_URI is missing in .env');
  }

  await mongoose.connect(env.MONGO_URI);

  console.log('MongoDB connected');
};

module.exports = connectDB;