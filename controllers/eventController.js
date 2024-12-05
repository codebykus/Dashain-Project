const Event = require("../models/Event");
const User = require("../models/User");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

const createEvent = catchAsync(async (req, res, next) => {
  const { title, description, date } = req.body;
  const currentUserId = req.user._id;

  const newEvent = new Event({
    title,
    description,
    date,
    creator: currentUserId,
    participants: [currentUserId],
  });

  await newEvent.save();
  res.status(201).json({
    msg: "Event is created successfully",
    event: newEvent,
  });
});

const getEvent = catchAsync(async (req, res, next) => {
  const currentUserId = req.user._id;

  const currentUser = await User.findById(currentUserId);
  if (!currentUser) {
    return next(new AppError("User not found", 404));
  }

  const events = await Event.find({
    participants: currentUserId,
    $or: [
      { creator: currentUserId },
      { creator: { $in: currentUser.familyMembers } },
    ],
  })
    .sort("date")
    .populate("creator", "name email profilePicture")
    .populate("participants", "name email profilePicture");

  res.json(events);
});

const joinEvent = catchAsync(async (req, res, next) => {
  const eventId = req.params.eventId;
  const userId = req.user._id;

  const event = await Event.findById(eventId);
  if (!event) {
    return next(new AppError("Event not found", 404));
  }

  if (event.participants.includes(userId)) {
    return next(new AppError("User is already a participant", 400));
  }

  const creatorInfo = await User.findById(event.creator);
  if (!creatorInfo.familyMembers.includes(userId)) {
    return next(new AppError("You don't have permission to join this event", 400));
  }

  event.participants.push(userId);
  await event.save();

  res.status(200).json({ msg: "User joined event successfully" });
});

const getEventDetails = catchAsync(async (req, res, next) => {
  const eventId = req.params.eventId;
  const currentUserId = req.user._id;

  const event = await Event.findById(eventId);
  if (!event) {
    return next(new AppError("Event not found", 404));
  }

  const isParticipant = event.participants.includes(currentUserId);
  if (!isParticipant) {
    return next(new AppError("You are not authorized to view this event", 403));
  }

  const isCreator = event.creator.toString() === currentUserId.toString();

  await event.populate("creator", "name email profilePicture");
  await event.populate("participants", "name email profilePicture");

  res.status(200).json({
    event,
    isCreator,
    isJoined: isParticipant,
  });
});

const getUnjoinedEvents = catchAsync(async (req, res, next) => {
  const userId = req.user._id;

  const currentUser = await User.findById(userId);
  if (!currentUser) {
    return next(new AppError("User not found", 404));
  }

  const familyEvents = await Event.find({
    creator: { $in: currentUser.familyMembers }, // Created by family members
    date: { $gte: new Date() }, // Future events only
  });

  const unjoinedEvents = familyEvents.filter(
    (event) => !event.participants.includes(userId) // User has not joined
  );

  res.status(200).json({ events: unjoinedEvents });
});

module.exports = {
  createEvent,
  getEvent,
  joinEvent,
  getEventDetails,
  getUnjoinedEvents,
};
