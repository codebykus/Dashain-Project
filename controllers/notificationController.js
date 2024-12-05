const Notification = require("../models/Notification");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

const notificationController = {
  getNotifications: catchAsync(async (req, res, next) => {
    const notifications = await Notification.find({
      recipient: req.user.userId,
    })
      .sort("-createdAt")
      .populate("sender", "name email profilePicture")
      .populate("eventId", "title");

    res.json({
      status: "success",
      message: "Notifications retrieved successfully",
      notifications,
    });
  }),

  createNotification: catchAsync(async (req, res, next) => {
    const { recipient, sender, type, eventId, status, read } = req.body;

    if (!recipient || !sender || !type) {
      return next(new AppError("Recipient, sender, and type are required.", 400));
    }

    const newNotification = new Notification({
      recipient,
      sender,
      type,
      eventId,
      status: status || "PENDING", // Default to "PENDING" if not provided
      read: read || false,         // Default to false if not provided
      createdAt: new Date(),
    });

    await newNotification.save();

    res.status(201).json({
      status: "success",
      message: "Notification created successfully",
      notification: newNotification,
    });
  }),

  markAsRead: catchAsync(async (req, res, next) => {
    const notification = await Notification.findOneAndUpdate(
      {
        _id: req.params.notificationId,
        recipient: req.user.userId,
      },
      { read: true },
      { new: true }
    );

    if (!notification) {
      return next(new AppError("Notification not found", 404));
    }

    res.json({
      status: "success",
      message: "Notification marked as read",
      notification,
    });
  }),
};

module.exports = notificationController;
