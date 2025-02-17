const mongoose = require('mongoose');
const User = require('../models/User');

const initializeAdmin = async () => {
  try {
    await User.initializeAdmin();
  } catch (error) {
    console.error('Error initializing admin account:', error);
  }
};

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    await initializeAdmin();
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;