const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

const app = express();
const http = require("http");
const server = http.createServer(app);

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Socket.io connection
const socketConnect = require("./socket/socketConnect");
socketConnect(server);

// Import routes
const userRoutes = require("./routes/userRoutes");
const eventRoute = require("./routes/eventRoutes");
const familyRoute = require("./routes/familyroutes");
const tikaRoutes = require("./routes/tikaRoutes");
const photoRoutes = require("./routes/photoRoutes");
const route= require("./routes/dashboard")
const notificationRoutes = require("./routes/notificationRoutes");
const errorHandler = require("./middleware/errorMiddleware");

// Define routes
app.use("/api/users", userRoutes);
app.use("/api/family", familyRoute);
app.use("/api/event", eventRoute);
app.use("/api/tika", tikaRoutes);
app.use("/api/photo", photoRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/dashboard", route);


// Global error handler
app.use(errorHandler);

// Database connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("MongoDB connection error:", err));

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
