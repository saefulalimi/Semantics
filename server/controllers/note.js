"use stritc";

const userModel = require("../models/user");

class noteController {
  static storeNote = async (req, res, next) => {
    try {
      const currentUser = req.currentUser;
      const note = req.body;

      const findUser = await userModel.findOne({ _id: currentUser._id });
      if (!findUser) {
        next({ code: 404, message: "User Not Found" });
        return;
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
        next({ code: 404, message: "User Not Found" });
        return;
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
      console.log("masuk delete controler");
      const currentUser = req.currentUser;
      const remove = req.body;
      console.log(remove);

      const data = await userModel.findOne({ _id: currentUser._id });
      if (!data) {
        next({ code: 404, message: "User Not Found" });
        return;
      }
      const latestNote = data.activity.subject;
      const filtering = latestNote.filter((note) => note.id !== remove.id);
      console.log("ini adalah data filtering", filtering);
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
}

module.exports = noteController;
