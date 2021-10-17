"use strict";

require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const socket = require("socket.io");
const { get_Current_User, user_Disconnect, join_User } = require("./Routers/dummyuser");
const PORT = process.env.PORT;

const Main = require("./Routers/index");
const errorHandler = require("./middlewares/errorHandler");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const url = process.env.URLm || "mongodb://localhost:27017/note";

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

  const io = socket(server);

    //initializing the socket io connection 
    io.on("connection", (socket) => {
    //for a new user joining the room
    socket.on("joinRoom", ({ username, roomname }) => {
        //* create user
        const p_user = join_User(socket.id, username, roomname);
        console.log(socket.id, "=id");
        socket.join(p_user.room);

        //display a welcome message to the user who have joined a room
        socket.emit("message", {
        userId: p_user.id,
        username: p_user.username,
        text: `Welcome ${p_user.username}`,
        });

        //displays a joined room message to all other room users except that particular user
        socket.broadcast.to(p_user.room).emit("message", {
        userId: p_user.id,
        username: p_user.username,
        text: `${p_user.username} has joined the chat`,
        });
    });

    //user sending message
    socket.on("chat", (text) => {
        //gets the room user and the message sent
        const p_user = get_Current_User(socket.id);

        io.to(p_user.room).emit("message", {
        userId: p_user.id,
        username: p_user.username,
        text: text,
        });
    });

    //when the user exits the room
    socket.on("disconnect", () => {
        //the user is deleted from array of users and a left room message displayed
        const p_user = user_Disconnect(socket.id);

        if (p_user) {
        io.to(p_user.room).emit("message", {
            userId: p_user.id,
            username: p_user.username,
            text: `${p_user.username} has left the room`,
        });
        }
    });
});
