"use strict";

const multer = require("multer");
const path = require("path");
const user = require("express").Router();
const userController = require("../controllers/user");
const userModel = require("../models/user");
const auth = require("../middlewares/authentication");

//Uploading
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `./public/upload`);
  },

  filename: function (req, file, cb) {
    cb(
      null,
      path.parse(file.originalname).name +
        "-" +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 2,
  },
});
//

user.post("/users/register", userController.reg);
user.post("/users/login", userController.log);
user.post("/users/update", auth, userController.update);
user.post(
  "/users/upload",
  auth,
  upload.single("picture"),
  async (req, res, next) => {
    try {
      const currentUser = req.currentUser;
      const { fullName, age, website, intro } = req.body;

      if (
        fullName !== "" &&
        age !== "" &&
        website !== "" &&
        intro != "" &&
        fullName !== null &&
        age !== null &&
        website !== null &&
        intro != null
      ) {
        if (!req.file) {
          return next({ code: 400, message: "Tolong masukan gambar anda" });
        }

        console.log("masuk updating");
        const user = await userModel.findOne({ _id: currentUser._id });
        if (!user) {
          return next({ code: 404, message: "User tidak ditemukan" });
        }

        const avatar = await userModel.updateOne(
          { _id: currentUser._id },
          {
            $set: {
              avatar: req.file.filename,
              fullName: fullName,
              age: age,
              website: website,
              intro: intro,
            },
          }
        );

        const newUpdate = await userModel.findOne({ _id: currentUser._id });
        console.log("selesai");
        return res.status(200).json({
          status: "success",
          data: {
            avatar:
              "http://" +
              req.hostname +
              ":" +
              process.env.PORT +
              "/upload/" +
              newUpdate.avatar,
            fullName: newUpdate.fullName,
            age: newUpdate.age,
            website: newUpdate.website,
            intro: newUpdate.intro,
          },
        });
      }
      return next({ code: 400, message: "Please Check Yor input" });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = user;
