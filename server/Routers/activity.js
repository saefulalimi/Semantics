"use strict";

const activity = require("express").Router();
const activityController = require("../controllers/activity");
const auth = require("../middlewares/authentication");

//subject
activity.post("/subject", auth, activityController.subjectAdd);
activity.get("/subject", auth, activityController.subjectGet);
activity.post("/subject", auth, activityController.subjectChange);

activity.post("/upcomingexam", auth, activityController.upcomingexam);
activity.post("/seminar", auth, activityController.seminar);
activity.post("/workshop", auth, activityController.workshop);
activity.post("/competition", auth, activityController.competition);

activity.get("/subject", auth, activityController.subjectGet);

module.exports = activity;
