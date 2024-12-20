const userSchema = require("../models/User");
const eventSchema = require("../models/Event");
const photoSchema = require("../models/Photo");
const msgSchema = require("../models/Message");

const dashboardController = {
  getDashboardData: async (req, res) => {
    try {
      const userCount = await userSchema.countDocuments();
      const eventCount = await eventSchema.countDocuments();
      const events = await eventSchema.find().sort({ createdAt: -1 }).limit(5);

      res.json({
        userCount,
        eventCount,
        latestEvents: events,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ msg: "Server Error", err });
    }
  },

  getPhotoStatistics: async (req, res) => {
    try {
      const photoCount = await photoSchema.countDocuments();

      const photosByUser = await photoSchema.aggregate([
        {
          $group: {
            _id: "$userId",
            count: { $sum: 1 },
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "_id",
            foreignField: "_id",
            as: "userInfo",
          },
        },
        {
          $unwind: "$userInfo",
        },
        {
          $project: {
            _id: 0,
            userId: "$userInfo._id",
            userName: "$userInfo.name",
            count: 1,
          },
        },
      ]);
      res.json({ photoCount, photosByUser });
    } catch (err) {
      console.log(err);
      res.status(500).json({ msg: "Server Error", err });
    }
  },

  msgStats: async (req, res) => {
    try {
      const msgCount = await msgSchema.aggregate([
        {
          $group: {
            _id: { eventId: "$eventId", senderId: "$sender" },
            count: { $sum: 1 },
          },
        },
        {
          $lookup: {
            from: "events",
            localField: "_id.eventId",
            foreignField: "_id",
            as: "eventDetails",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "_id.senderId",
            foreignField: "_id",
            as: "userDetails",
          },
        },
        { $unwind: "$eventDetails" },
        { $unwind: "$userDetails" },
        {
          $project: {
            _id: 0,
            userName: "$userDetails.name",
            eventName: "$eventDetails.title",
            count: 1,
          },
        },
      ]);

      res.json(msgCount);
    } catch (err) {
      console.log(err);
      res.status(500).json({ msg: "Server Error", err });
    }
  },
  eventPerDate: async (req, res) => {
    try {
      const eventDate = await eventSchema.aggregate([
        {
          $group: {
            _id: {
              date: "$date",
            },

            count: { $sum: 1 },
            events: {
              $push: "$title",
            },
          },
        },
        {
          $project: {
            _id: 0,
            date: "$_id.date",
            count: 1,
            events: 1,
          },
        },
      ]);
      res.json(eventDate);
    } catch (err) {
      console.log(err);
      res.status(500).json({ msg: "Server Error" });
    }
  },
};

module.exports = dashboardController;