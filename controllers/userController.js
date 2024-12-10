const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync'); // Assuming catchAsync is implemented

// Register User
const registerUser = catchAsync(async (req, res, next) => {
  const { name, email, password,confirmPassword } = req.body;

  // Check if the email is already registered
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new AppError('Email is already registered', 400));
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create and save the user
  const newUser = new User({ name, email, password: hashedPassword });
  await newUser.save();

  res.status(201).json({ status: 'success', message: 'User registered successfully' });
});

// Login User
const loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // Check if the user exists
  const user = await User.findOne({ email });
  if (!user) {
    return next(new AppError('Invalid credentials', 400));
  }

  // Compare passwords
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return next(new AppError('Invalid credentials', 400));
  }

  // Generate a token
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.status(200).json({ status: 'success', token });
});

// Get User Details
const getUserDetails = catchAsync(async (req, res, next) => {
  const userId = req.user._id;

  // Fetch user details without password
  const user = await User.findById(userId).select('-password');
  if (!user) {
    return next(new AppError('User not found', 404));
  }

  res.status(200).json({ status: 'success', data: user });
});

// Edit User Details
const editUserDetails = catchAsync(async (req, res, next) => {
  const { name } = req.body;
  const userId = req.user._id;

  // Find the user
  const user = await User.findById(userId);
  if (!user) {
    return next(new AppError('User not found', 404));
  }

  // Update details
  if (name) user.name = name;
  if (req.file && req.file.filename) {
    user.profilePicture = `/uploads/${req.file.filename}`;
  }

  await user.save();

  res.status(200).json({
    status: 'success',
    message: 'User details updated successfully',
    data: user,
  });
});

module.exports = { registerUser, loginUser, getUserDetails, editUserDetails };
