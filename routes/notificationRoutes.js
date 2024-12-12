const express = require("express");
const notificationRoutes = express.Router();
const authValidation = require("../middleware/authverify"); // Middleware for authentication
const {
  createNotification,
  getNotifications,
  markAsRead,
} = require("../controllers/notificationController");
const { validateNotificationCreate } = require("../middleware/validation"); // Import notification validation
const { validate } = require("../middleware/validation"); // Generic validation middleware

// POST route for creating notifications
notificationRoutes.post(
  "/",
  authValidation,
  validateNotificationCreate(),
  validate,
  createNotification
);

// GET route for retrieving notifications
notificationRoutes.get("/", authValidation, getNotifications);

// PUT route for marking a notification as read
notificationRoutes.put("/:notificationId/read", authValidation, markAsRead);

module.exports = notificationRoutes;
