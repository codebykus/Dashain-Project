const Notification = require("../../models/Notification");
const User = require("../../models/User");

function notificationHandlers(io, socket) {
  // Send family request
  socket.on("send-family-request", async (data) => {
    try {
      const { recipientId } = data;

      // Create notification
      const notification = new Notification({
        recipient: recipientId,
        sender: socket.user.userId,
        type: "FAMILY_REQUEST",
      });

      await notification.save();
      await notification.populate("sender", "name email profilePicture");

      // Emit to recipient
      io.to(`user:${recipientId}`).emit("new-notification", notification);
    } catch (error) {
      socket.emit("error", { message: "Error sending family request" });
    }
  });

  // Handle family request response
  socket.on("respond-family-request", async (data) => {
    try {
      const { notificationId, accept } = data;

      const notification = await Notification.findById(notificationId)
        .populate("sender", "name email profilePicture")
        .populate("recipient", "name email profilePicture");

      if (!notification) {
        socket.emit("error", { message: "Notification not found" });
        return;
      }

      notification.status = accept ? "ACCEPTED" : "REJECTED";
      await notification.save();

      if (accept) {
        // Add family members
        const [sender, recipient] = await Promise.all([
          User.findById(notification.sender._id),
          User.findById(notification.recipient._id),
        ]);

        sender.familyMembers.push(recipient._id);
        recipient.familyMembers.push(sender._id);

        await Promise.all([sender.save(), recipient.save()]);
      }

      // Notify both users
      io.to(`user:${notification.sender._id}`).emit("family-request-response", {
        notification,
        accepted: accept,
      });

      io.to(`user:${notification.recipient._id}`).emit(
        "family-request-response",
        {
          notification,
          accepted: accept,
        }
      );
    } catch (error) {
      socket.emit("error", { message: "Error responding to family request" });
    }
  });

  // Event join notification
  socket.on("event-joined", async (data) => {
    try {
      const { eventId } = data;

      const notification = new Notification({
        recipient: data.creatorId,
        sender: socket.user.userId,
        type: "EVENT_JOIN",
        eventId,
      });

      await notification.save();
      await notification.populate("sender", "name email profilePicture");
      await notification.populate("eventId", "title");

      io.to(`user:${data.creatorId}`).emit("new-notification", notification);
    } catch (error) {
      socket.emit("error", {
        message: "Error sending event join notification",
      });
    }
  });
}

module.exports = notificationHandlers;