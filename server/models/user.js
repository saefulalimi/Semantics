"use strict";

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    userName: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    fullName: { type: String, require: false, default: "" },
    age: { type: Number, require: false, default: null },
    website: { type: String, require: false, default: "" },
    intro: { type: String, require: false, default: "" },
    avatar: {
      type: String,
      required: false,
      default: null,
    },
    activity: {
      subject: { type: "array" },
      upcomingexam: { type: "array" },
      seminar: { type: "array" },
      workshop: { type: "array" },
      competition: { type: "array" },
    },
  },
  {
    collection: "user",
  }
);

const model = mongoose.model("user", UserSchema);

module.exports = model;

//db.inventory.insertOne({"item":"postcard", "size.h": 10},{size: {tinggi: 199})
