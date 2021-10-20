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
        return next({ code: 400, message: "Invalid Input in Username" });
      }

      if (!email || typeof userName !== "string") {
        return next({ code: 400, message: "Invalid Input in Email" });
      }

      if (password.length < 8) {
        return next({ code: 411, message: "Password To Small Min 8 Char" });
      }

      if (password !== confir) {
        return next({ code: 417, message: "Invalid Input in Password" });
      }

      const checkUser = await user.findOne({ email: email });
      if (checkUser) {
        return next({ code: 409, message: "Account has Registered" });
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
      console.log("masuk backend");
      const { email, password } = req.body;
      console.log({ email, password });

      if (!email) {
        return next({ code: 400, message: "Invalid Email/Password" });
      }

      const data = await user.findOne({ email: email }).lean();
      if (!data) {
        return next({ code: 400, message: "Invalid Email/Password" });
      }

      if (!bcrypt.compareSync(password, data.password)) {
        return next({ code: 400, message: "Invalid Email/Password" });
      }

      const jwtPayload = {
        id: data._id,
      };

      const token = jwt.sign(jwtPayload, process.env.SECREAT_KEY);

      if (data.avatar === null) {
        res.status(200).json({
          token: token,
          dataUser: {
            fullName: data.fullName,
            age: data.age,
            website: data.website,
            intro: data.intro,
            avatar: data.avatar,
            activity: data.activity,
          },
        });
      } else {
        res.status(200).json({
          token: token,
          dataUser: {
            fullName: data.fullName,
            age: data.age,
            website: data.website,
            intro: data.intro,
            avatar:
              "http://" +
              req.hostname +
              ":" +
              process.env.PORT +
              "/upload/" +
              data.avatar,
            activity: data.activity,
          },
        });
      }
    } catch (error) {
      next(error);
    }
  };

  static findUser = async (req, res, next) => {
    try {
      const currentUser = req.currentUser;
      const user = await user.findOne({ _id: currentUser._id });

      if (!user) {
        return next({ code: 404, message: "user not found" });
      }

      res.status(200).json({
        message: "sucess, getting user",
        data: {
          avatar:
            "http://" +
            req.hostname +
            ":" +
            process.env.PORT +
            "/upload/" +
            user.avatar,
          fullName: user.fullName,
          age: age.age,
          website: user.website,
          intro: user.intro,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  static update = async (req, res, next) => {
    try {
      const currentUser = req.currentUser;
      const { fName, age, website, intro } = req.body;

      if (
        fName !== "" &&
        age !== "" &&
        website !== "" &&
        intro != "" &&
        fName !== null &&
        age !== null &&
        website !== null &&
        intro != null
      ) {
        const findUser = await user.findOne({ _id: currentUser._id });

        if (!findUser) {
          return next({ code: 404, message: "User not found" });
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
      }
      return next({ code: 400, message: "Please Check Input" });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = userController;
