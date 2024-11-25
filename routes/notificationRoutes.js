const express = require("express");
const notificationRoutes = express.Router();
const authValidation = require("../middleware/authverify"); // Middleware for authentication
const { createNotification, getNotifications,markAsRead } = require("../controllers/notificationController");

// POST route for creating notifications
notificationRoutes.post("/", authValidation, createNotification);  
notificationRoutes.get("/", authValidation, getNotifications);    
notificationRoutes.put("/:notificationId/read", authValidation,markAsRead);

module.exports = notificationRoutes;
