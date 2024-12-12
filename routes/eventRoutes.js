const express = require("express");
const eventRoutes = express.Router();
const authValidation = require("./../middleware/authverify");
const {
  createEvent,
  getEvent,
  joinEvent,
  getEventDetails,
  getUnjoinedEvents,
} = require("../controllers/eventController");
const { getEventMessages } = require("../controllers/messageController");
const {
  validate,
  validateEventCreate,
  validateJoinEvent,
} = require("../middleware/validation");

eventRoutes.post(
  "/",
  authValidation,
  validateEventCreate(),
  validate,
  createEvent
);
eventRoutes.get("/", authValidation, getEvent);
eventRoutes.post(
  "/:eventId/join",
  authValidation,
  validateJoinEvent(),
  validate,
  joinEvent
);
eventRoutes.get("/:eventId/details", authValidation, getEventDetails);
eventRoutes.get("/unjoined", authValidation, getUnjoinedEvents);
eventRoutes.get("/:eventId/messages", authValidation, getEventMessages);

module.exports = eventRoutes;
