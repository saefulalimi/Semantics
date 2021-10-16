"use stroct";

const mainRouter = require("express").Router();
const userRouter = require("./user");
const activity = require("./activity");
const note = require("./note");

mainRouter.use(userRouter);
mainRouter.use(activity);
mainRouter.use(note);

module.exports = mainRouter;
