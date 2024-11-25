const Notification = require("../models/Notification");

const notificationController = {
  getNotifications: async (req, res) => {
    try {
      const notifications = await Notification.find({
        recipient: req.user.userId,
      })
        .sort("-createdAt")
        .populate("sender", "name email profilePicture")
        .populate("eventId", "title");

      res.json(notifications);
    } catch (error) {
      console.error("Error in getNotifications:", error);
      res.status(500).json({ message: "Server error" });
    }
  },

  createNotification: async (req, res) => {
    try {
      const { recipient, sender, type, eventId, status, read } = req.body;
  
      if (!recipient || !sender || !type) {
        return res.status(400).json({ message: "Recipient, sender, and type are required." });
      }
  
      const newNotification = new Notification({
        recipient,
        sender,
        type,
        eventId,
        status: status || "PENDING", 
        read: read || false, 
        createdAt: new Date(),
      });
  
      await newNotification.save();
  
      res.status(201).json(newNotification);
    } catch (error) {
      console.error("Error creating notification:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },

  markAsRead:async (req,res)=>{
    try{
        const notification=await Notification.findOneAndUpdate(
            {
                _id:req.params.notificationId,
                recipent:req.user.userId,

            },
            {read:true},
            {new:true}
        );
        if(!notification){
            return res.status(404).json({message:"Notification not found"})
        }
        res.join(notification);

    }catch (error){
        console.error("Error in markAsRead:",error)
res.status(500).json({message:"Server error"})    }
    }}
module.exports = notificationController