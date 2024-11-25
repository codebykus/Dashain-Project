const Event = require("../models/Event");
const User = require("../models/User");

const createEvent = async (req, res) => {
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
};

const getEvent = async (req, res) => {
    const currentUser = await User.findById(req.user._id);
    if (!currentUser) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    const events = await Event.find({
        participants: req.user._id,
        $or: [
            { creator: req.user._id },
            { creator: { $in: currentUser.familyMembers } },
        ],
    })
        .sort("date")
        .populate("creator", "name email profilePicture")
        .populate("participants", "name email profilePicture");

    res.json(events);
};

const joinEvent = async (req, res) => {
    const eventId = req.params.eventId;
    const userId = req.user._id;

    try {
        // Check if the event exists
        const isEventExist = await Event.findById(eventId);
        if (!isEventExist) {
            return res.status(404).json({ msg: "Event not found" });
        }

        // Check if the user is already a participant
        if (isEventExist.participants.includes(userId)) {
            return res.status(400).json({ msg: "User is already a participant" });
        }

        // Check if the user is in the creator's familyMembers
        const creatorInfo = await User.findById(isEventExist.creator);
        if (!creatorInfo.familyMembers.includes(userId)) {
            return res.status(400).json({ msg: "You don't have permission" });
        }

        // Add user to participants and save
        isEventExist.participants.push(userId);
        await isEventExist.save();

        res.status(200).json({ msg: "User joined event successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server error" });
    }
};

const getEventDetails = async (req, res) => {
    try {
        const eventId = req.params.eventId;
        const currentUserId = req.user._id;

        // Check if event exists
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ msg: "Event not found" });
        }

        const isParticipant = event.participants.includes(currentUserId);
        if (!isParticipant) {
            return res.status(403).json({ msg: "You are not authorized to view this event" });
        }

        const isCreator = event.creator.toString() === currentUserId.toString();

        await event.populate("creator", "name email profilePicture");
        await event.populate("participants", "name email profilePicture");
        
        res.status(200).json({
            event,
            isCreator,
            isJoined: isParticipant,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: err.message });
    }
};
const getUnjoinedEvents = async (req, res) => {
  try {
    const userId = req.user._id;
    const currentUser = await User.findById(userId);

    if (!currentUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Find events created by family members and filter unjoined ones
    const familyEvents = await Event.find({
      creator: { $in: currentUser.familyMembers }, // Created by family members
      date: { $gte: new Date() },                 // Future events only
    });

    const unjoinedEvents = familyEvents.filter(
      (event) => !event.participants.includes(userId) // User has not joined
    );

    res.status(200).json({ events: unjoinedEvents });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

module.exports = {
    createEvent,
    getEvent,
    joinEvent,
    getEventDetails,
    getUnjoinedEvents,
};