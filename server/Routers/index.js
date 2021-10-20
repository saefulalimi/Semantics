"use stroct";

const mainRouter = require("express").Router();
const userRouter = require("./user");
const note = require("./note");

mainRouter.use(userRouter);
mainRouter.use(note);

module.exports = mainRouter;
