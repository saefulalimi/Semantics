"use strict";

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullName: { type: String, required: false, default: "" },
    age: { type: Number, required: false, default: null },
    website: { type: String, required: false, default: "" },
    intro: { type: String, required: false, default: "" },
    avatar: {
      type: String,
      required: false,
      default: null,
    },
    activity: {
      subject: { type: "array" },
      // upcomingexam: { type: "array" },
      // seminar: { type: "array" },
      // workshop: { type: "array" },
      // competition: { type: "array" },
    },
  },
  {
    collection: "user",
  }
);

const model = mongoose.model("user", UserSchema);

module.exports = model;

//db.inventory.insertOne({"item":"postcard", "size.h": 10},{size: {tinggi: 199})
