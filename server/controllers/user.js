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
        next({ code: 400, message: "Invalid Input in Username" });
        return;
      }

      if (!email || typeof userName !== "string") {
        next({ code: 400, message: "Invalid Input in Email" });
        return;
      }

      if (password !== confir) {
        next({ code: 400, message: "Invalid Input in Password" });
        return;
      }

      if (password.length < 8) {
        next({ code: 400, message: "Password To Small Min 8 Char" });
        return;
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
      console.log('masuk backend')
      const { email, password } = req.body;
      console.log({email, password})

      if (!email) {
        next({code:400, message: 'Invalid Email/Password'})
        return;
      }

      const data = await user.findOne({ email: email }).lean();
      if (!data) {
        next({code:400, message: 'Invalid Email/Password'})
        return;

      }

      if (!bcrypt.compareSync(password, data.password)) {
        next({code:400, message: 'Invalid Email/Password'})
        return;
      }

      const jwtPayload = {
        id: data._id,
      };

      const token = jwt.sign(jwtPayload, process.env.SECREAT_KEY);

      // const ava = 'http://'+req.hostname+':'+process.env.PORT+'/upload/'+data.avatar;

      if(data.avatar === null){
          res.status(200).json({
          token: token,
          dataUser: {
            fullName: data.fullName,
            age: data.age,
            website: data.website,
            intro: data.intro,
            avatar: data.avatar,
            activity: data.activity,
          }
        });
      } else {
        res.status(200).json({
        token: token,
        dataUser: {
          fullName: data.fullName,
          age: data.age,
          website: data.website,
          intro: data.intro,
          avatar: 'http://'+req.hostname+':'+process.env.PORT+'/upload/'+data.avatar,
          activity: data.activity,
        }
      });
      }
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
