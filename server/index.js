"use strict";

require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const PORT = process.env.PORT;

const Main = require("./Routers/index");
const errorHandler = require("./middlewares/errorHandler");

app.use(
  cors({
    origin: "*",
  })
);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  },
});
server.listen(5000);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const url = process.env.URL;

io.on("connection", (socket) => {
  console.log(`User Connected : ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with id: ${socket.id} joined Room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("recive_message", data);
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected`);
  });
});

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
  })
  .then(() => {
    console.log(`Server Connected`);
    app.use(Main);
    app.use(errorHandler);
    app.listen(PORT, () => console.log(`Server Connect on port ${PORT}`));
  })
  .catch((err) => {
    console.log(`Error connect to server`, err);
    process.exit();
  });
