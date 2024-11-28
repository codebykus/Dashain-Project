const User = require("../models/User");
const Event = require("../models/Event");
const Photo = require("../models/Photo");
const Message=require("../models/Message.js")
const dashboardController = {
  getDashboardData: async (req, res) => {
    try {
      // const userCount = await User.countDocuments();
      // const eventCount = await Event.countDocuments();
      // const events = await Event.find().sort({ createdAt: -1 }).limit(5); // Get the latest 5 events
const messageStats=await Message.aggregate([
  {
    $group:{
      _id:{
        userId:"$sender",
        eventId:"$eventId",
       
      },
      count:{$sum:1}
    }
  }
])
      res.json({
        // userCount,
        // eventCount,
        // latestEvents: events,
        messageStats,
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },

  getPhotoStatistics: async (req, res) => {
    try {
      const totalPhotos = await Photo.countDocuments();
      const photosByUser = await Photo.aggregate([
        {
          $group: {
            _id: "$userId",
            count: { $sum: 1 },
          },
        },
        {
          $lookup: {
            from: "users", // The name of the User collection
            localField: "_id",
            foreignField: "_id",
            as: "userInfo",
          },
        },
        {
          $unwind: "$userInfo", // Unwind the userInfo array to get the name
        },
        {
          $project: {
            _id: 0, // Exclude the _id field
            userId: "$userInfo._id",
            userName: "$userInfo.name", // Include the user's name
            count: 1,
          },
        },
      ]);

      res.json({
        totalPhotos,
        photosByUser,
      });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },
};

module.exports = dashboardController;