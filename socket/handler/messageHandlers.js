const Message = require("../../models/Message");
const Event = require("../../models/Event");

function messageHandlers(io, socket) {
  // Send a regular message
  socket.on("send-message", async (data) => {
    try {
      const { eventId, content } = data;

      // Verify user is participant
      const event = await Event.findById(eventId);
      if (!event || !event.participants.includes(socket.user.userId)) {
        socket.emit("error", { message: "Not authorized to send messages" });
        return;
      }

      // Create and save message
      const message = new Message({
        eventId,
        sender: socket.user.userId,
        content,
      });

      await message.save();
      await message.populate("sender", "name email profilePicture");

      // Broadcast message to event room
      io.to(`event:${eventId}`).emit("new-message", message);
    } catch (error) {
      socket.emit("error", { message: "Error sending message" });
    }
  });

  // Send tika
  socket.on("send-tika", async (data) => {
    try {
      const { eventId, recipientId, amount, message } = data;

      // Verify users are participants
      const event = await Event.findById(eventId);
      if (
        !event ||
        !event.participants.includes(socket.user.userId) ||
        !event.participants.includes(recipientId)
      ) {
        socket.emit("error", { message: "Not authorized to send tika" });
        return;
      }

      // Create and save tika message
      const tikaMessage = new Message({
        eventId,
        sender: socket.user.userId,
        content: message || "Sent tika 🎉",
        tikaAmount: amount,
        tikaRecipient: recipientId,
      });

      await tikaMessage.save();
      await tikaMessage.populate("sender", "name email profilePicture");
      await tikaMessage.populate("tikaRecipient", "name email profilePicture");

      // Broadcast tika message to event room
      io.to(`event:${eventId}`).emit("new-tika", tikaMessage);
    } catch (error) {
      socket.emit("error", { message: "Error sending tika" });
    }
  });
}

module.exports = messageHandlers;