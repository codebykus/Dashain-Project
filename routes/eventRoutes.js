const express = require("express");
const eventRoutes = express.Router();
const authValidation = require("./../middleware/authverify");
const {
    createEvent,
    getEvent,
    joinEvent,
    getEventDetails,
    getUnjoinedEvents
} = require("../controllers/eventController");

eventRoutes.post("/", authValidation, createEvent);
eventRoutes.get("/", authValidation, getEvent);
eventRoutes.post("/:eventId/join", authValidation, joinEvent);
eventRoutes.get("/:eventId/details", authValidation, getEventDetails);
eventRoutes.get("/unjoined", authValidation, getUnjoinedEvents);

module.exports = eventRoutes;
