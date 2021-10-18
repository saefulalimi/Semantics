"use strict";

require("dotenv").config();
const user = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class userController {
  static reg = async (req, res, next) => {
    try {
      const { userName, email, password, confir } = req.body;
      if (!userName || typeof userName !== "string") {
        const newError = new Error();
        newError.name = "InvalidInput";
        newError.message = "Invalid Username";
        throw newError;
      }

      if (!email || typeof userName !== "string") {
        const newError = new Error();
        newError.name = "InvalidInput";
        newError.message = "Invalid Email";
        throw newError;
      }

      if (password !== confir) {
        const newError = new Error();
        newError.name = "InvalidInput";
        newError.message = "Password is not same";
        throw newError;
      }

      if (password.length < 8) {
        const newError = new Error();
        newError.name = "InvalidInput";
        newError.message = "Password to small, min 8 char";
        throw newError;
      }

      const hashPass = await bcrypt.hash(password, 10);
      const data = {
        userName: userName,
        email: email,
        password: hashPass,
      };

      const response = await user.create(data);
      res.status(201).send({
        message: "success create user",
        response,
      });
    } catch (error) {
      next(error);
    }
  };

  static log = async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email) {
        const newError = new Error();
        newError.name = "ErrorLogin";
        newError.message = "Invalid Email/Password";
        throw newError;
      }

      const data = await user.findOne({ email: email }).lean();
      if (!data) {
        const newError = new Error();
        newError.name = "ErrorLogin";
        newError.message = "Invalid Email/Password";
        throw newError;
      }

      if (!bcrypt.compareSync(password, data.password)) {
        const newError = new Error();
        newError.name = "ErrorLogin";
        newError.message = "Invalid Username/Password";
        throw newError;
      }

      const jwtPayload = {
        id: data._id,
      };

      const token = jwt.sign(jwtPayload, process.env.SECREAT_KEY);

      res.status(200).json({
        token: token,
        activity: data.activity,
      });
    } catch (error) {
      next(error);
    }
  };

  static findUser = async (req, res, next) => {
    try {
      const { token } = req.body;
      const data = jwt.verify(token, process.env.SECREAT_KEY);
      const user = await user.findOne({ _id: data.id });

      if (!user) {
        const newError = new Error();
        newError.name = "UserNotFound";
        newError.message = "User Not Found";
        throw newError;
      }

      res.status(200).json({
        message: "sucess, getting user",
        user,
      });
    } catch (error) {
      next(error);
    }
  };

  static update = async (req, res, next) => {
    try {
      const currentUser = req.currentUser;
      const { fName, age, website, intro } = req.body;

      const findUser = await user.findOne({ _id: currentUser._id });

      if (!findUser) {
        next({ code: 404, message: "User not found" });
        return;
      }

      const update = await user.updateOne(
        { _id: currentUser._id },
        {
          $set: { fullName: fName, age: age, website: website, intro: intro },
        }
      );

      const newUserWithNewData = await user.findOne({ _id: currentUser._id });
      res.status(200).json({
        data: newUserWithNewData,
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = userController;
