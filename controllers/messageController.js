const Message=require("../models/Message");
const Event=require("../models/Event");
 const getEventMessage=async(req.params);
 const {eventId}=req.params;
 const currentUserId=req.user._id;
 const event=await Event.findById(eventId);
 if(!event){
  return res.status(404).josn({
    msg:"Event not found",
  });

 }
 if(!event.participants.includes(currentUserId)){
  return res.status(400).json({
    msg:"You are not authorized to view messages",

  });

 }

 const eventMessages=await Message.find({
  eventId,
 })

 .populate("sender","name email profilePicture")
 .sort("createdAt");
 res.join({
  eventMessages
 });

module.exports={getEventMessage}

