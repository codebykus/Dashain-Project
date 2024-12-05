const User = require("../models/User");
const Tika = require("../models/Tika");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

const addTika = catchAsync(async (req, res, next) => {
  const { receiverId, tikaMessage, blessings } = req.body;
  const senderId = req.user._id;

  // Validate that all required fields are present
  if (!receiverId || !tikaMessage || !blessings) {
    return next(new AppError("Missing required fields", 400));
  }

  const sender = await User.findById(senderId);
  const receiver = await User.findById(receiverId);

  if (!sender || !receiver) {
    return next(new AppError("Sender or receiver not found", 404));
  }

  const newTika = new Tika({
    senderId,
    receiverId,
    tikaMessage,
    blessings,
    tikaDate: new Date(),
  });

  await newTika.save();

  res.status(201).json({
    status: "success",
    message: "Tika sent successfully!",
    tika: newTika,
  });
});

const getTika = catchAsync(async (req, res, next) => {
  const tikas = await Tika.find()
    .populate("senderId", "name email")
    .populate("receiverId", "name email");

  if (!tikas) {
    return next(new AppError("No Tikas found", 404));
  }

  res.status(200).json({
    status: "success",
    data: tikas,
  });
});

module.exports = { addTika, getTika };
    