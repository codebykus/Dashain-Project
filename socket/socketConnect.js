const socketIO = require("socket.io");
const messageHandlers = require("./handler/messageHandlers");
const notificationHandlers = require("./handler/notificationHandlers");
const jwt = require("jsonwebtoken");

function initializeSocket(server) {
  const io = socketIO(server, {
    cors: {
      origin: process.env.FRONTEND_URL || "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  // Middleware to authenticate socket connections
  io.use(async (socket, next) => {
    try {
      const token =
        socket?.handshake["headers"]?.token || socket?.handshake?.auth?.token;
      console.log(token);
      if (!token) {
        return next(new Error("Authentication error"));
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded);
      socket.user = decoded;

      next();
    } catch (error) {
      next(new Error("Authentication error"));
    }
  });

  // Handle socket connections
  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.user.userId}`);

    // Join user to their personal room
    socket.join(`user:${socket.user.userId}`);

    // Join user to their specific rooms
    socket.on("join-event", (eventId) => {
      socket.join(`event:${eventId}`);
      console.log(`User ${socket.user.userId} joined event ${eventId}`);
    });

    // Handle messages
    messageHandlers(io, socket);
    // Add notification handlers
    notificationHandlers(io, socket);
    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.user.userId}`);
    });
  });

  return io;
}

module.exports = initializeSocket;