const Message = require("../models/Message");
const Event = require("../models/Event");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

const messageController = {
  getEventMessages: catchAsync(async (req, res, next) => {
    const { eventId } = req.params;
    const userId = req.user.userId;

    // Check if the user is a participant of the event
    const event = await Event.findById(eventId);
    if (!event || !event.participants.includes(userId)) {
      return next(new AppError("Not authorized to view messages", 403));
    }

    // Retrieve messages and populate sender details
    const messages = await Message.find({ eventId })
      .populate("sender", "name email profilePicture")
      .sort("createdAt");

    // Send the response
    res.json({
      status: "success",
      message: "Messages retrieved successfully",
      messages,
    });
  }),
};

module.exports = messageController;
