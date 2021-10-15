"use strict";

const userModel = require("../models/user");

class activity {
  //subject
  static subjectAdd = async (req, res, next) => {
    try {
      const currentUser = req.currentUser;
      const data = req.body;

      const user = await userModel.findOne({ _id: currentUser._id });

      if (!user) {
        next({ code: 404, message: "User Not Found" });
        return;
      }

      const lastdata = [...user.activity.subject];

      const update = await userModel.updateOne(
        { _id: user._id },
        { $set: { "activity.subject": [...user.activity.subject, data] } }
      );

      res.status(200).json({ message: "created" });
    } catch (error) {
      next(error);
    }
  };

  static subjectGet = async (req, res, next) => {
    try {
      const currentUser = req.currentUser;

      const user = await userModel.findOne({ _id: currentUser._id });

      if (!user) {
        next({ code: 404, message: "User Not Found" });
        return;
      }

      res.status(200).json({ data: user.activity.subject });
    } catch (error) {
      next(error);
    }
  };

  static subjectChange = async (req, res, next) => {
    try {
      const currentUser = req.currentUser;
      const data = req.body;

      const user = userModel.findOne({ _id: currentUser._id });
      if (!user) {
        next({ code: 404, message: "User Not Found" });
        return;
      }

      let update = [];
      user.activity.subject.map((sub) =>
        sub.id === data.id ? [...update, data] : [...update, sub]
      );

      const newSubject = await userModel.findOne(
        { _id: currentUser._id },
        {
          $set: { "activity.subject": update },
        }
      );

      res.status(200).json({
        subject: update,
      });
    } catch (error) {
      next(error);
    }
  };

  static subjectDelete = async (req, res, next) => {
    try {
      const currentUser = req.currentUser;
    } catch (error) {
      next(error);
    }
  };

  static upcomingexam = async (req, res, next) => {
    try {
      const currentUser = req.currentUser;
      const exams = req.body;

      const user = await userModel.findOne({ _id: currentUser._id });

      if (!user) {
        next({ code: 404, message: "User Not Found" });
        return;
      }

      const update = await userModel.updateOne(
        { _id: currentUser._id },
        { $set: { "activity.upcomingexam": exams } }
      );

      res.status(200).json({ update });
    } catch (error) {
      next(error);
    }
  };

  static seminar = async (req, res, next) => {
    try {
      const currentUser = req.currentUser;
      const seminars = req.body;

      const user = await userModel.findOne({ _id: currentUser._id });

      if (!user) {
        next({ code: 404, message: "User Not Found" });
        return;
      }

      const update = await userModel.updateOne(
        { _id: currentUser._id },
        { $set: { "activity.seminar": seminars } }
      );

      res.status(200).json({ update });
    } catch (error) {
      next(error);
    }
  };

  static workshop = async (req, res, next) => {
    try {
      const currentUser = req.currentUser;
      const workshops = req.body;

      const user = await userModel.findOne({ _id: currentUser._id });

      if (!user) {
        next({ code: 404, message: "User Not Found" });
        return;
      }

      const update = await userModel.updateOne(
        { _id: currentUser._id },
        { $set: { "activity.workshop": workshops } }
      );

      res.status(200).json({ update });
    } catch (error) {
      next(error);
    }
  };

  static competition = async (req, res, next) => {
    try {
      const currentUser = req.currentUser;
      const competitions = req.body;

      const user = await userModel.findOne({ _id: currentUser._id });

      if (!user) {
        next({ code: 404, message: "User Not Found" });
        return;
      }

      const update = await userModel.updateOne(
        { _id: currentUser._id },
        { $set: { "activity.competition": competitions } }
      );

      res.status(200).json({ update });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = activity;
