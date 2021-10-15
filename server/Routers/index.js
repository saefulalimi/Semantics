"use stroct";

const mainRouter = require("express").Router();
const userRouter = require("./user");
const activity = require("./activity");

mainRouter.use(userRouter);
mainRouter.use(activity);

module.exports = mainRouter;
