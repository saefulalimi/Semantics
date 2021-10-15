"use strict";

const notes = require("express").Router();
const auth = require("../middlewares/authentication");
const noteController = require("../controllers/note");

notes.post("/notes", auth, noteController.storeNote);
notes.get("/notes", auth, noteController.getNote);
notes.patch("/notes", auth, noteController.deleteNote);

module.exports = notes;
