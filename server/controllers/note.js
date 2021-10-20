"use stritc";

const userModel = require("../models/user");

class noteController {
  static storeNote = async (req, res, next) => {
    try {
      const currentUser = req.currentUser;
      const note = req.body;

      const findUser = await userModel.findOne({ _id: currentUser._id });
      if (!findUser) {
        return next({ code: 404, message: "User Not Found" });
      }

      const notes = findUser.activity.subject;
      let latestNote = [...notes, note];
      const updateNote = await userModel.updateOne(
        { _id: findUser._id },
        {
          $set: { "activity.subject": latestNote },
        }
      );

      res.status(201).json({
        data: latestNote,
      });
    } catch (error) {
      next(error);
    }
  };

  static getNote = async (req, res, next) => {
    try {
      const currentUser = req.currentUser;

      const user = await userModel.findOne({ _id: currentUser._id });
      if (!user) {
        return next({ code: 404, message: "User Not Found" });
      }
      const notes = user.activity.subject;
      res.status(200).json({
        data: notes,
      });
    } catch (error) {
      next(error);
    }
  };

  static deleteNote = async (req, res, next) => {
    try {
      const currentUser = req.currentUser;
      const remove = req.body;

      const data = await userModel.findOne({ _id: currentUser._id });
      if (!data) {
        return next({ code: 404, message: "User Not Found" });
      }
      const latestNote = data.activity.subject;
      const filtering = latestNote.filter((note) => note.id !== remove.id);
      const update = await userModel.updateOne(
        { _id: currentUser._id },
        { $set: { "activity.subject": filtering } }
      );
      res.status(200).json({
        data: filtering,
      });
    } catch (error) {
      next(error);
    }
  };

  static updateNote = async (req, res, next) => {
    try {
      const currentUser = req.currentUser;
      const data = req.body;

      const latestData = await userModel.findOne({ _id: currentUser._id });
      if (!latestData) {
        return next({ code: 404, message: "User Not Found" });
      }

      let updating = [];
      latestData.activity.subject.map((note) => {
        note.id === data.id
          ? (updating = [...updating, data])
          : (updating = [...updating, note]);
      });

      const update = await userModel.updateOne(
        { _id: currentUser._id },
        {
          $set: { "activity.subject": updating },
        }
      );

      res.status(200).json({
        data: updating,
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = noteController;
