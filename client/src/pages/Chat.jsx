import React from "react";
import "../style/chat.css";
import io from "socket.io-client";
import { useState } from "react";
import Chatt from "../component/chat/Chatt";
import MobileNavbar from "../component/navbar/mobile/MobileNavbar";
import { Link } from "react-router-dom";
import { BsBackspaceFill } from "react-icons/bs";

const socket = io.connect("http://localhost:5000");

function Chat() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div>
      <Link
        className="hidden md:inline-block absolute inset z-index-10 my-3 mx-5"
        to="/dashboard"
      >
        <BsBackspaceFill
          className="hover:cursor-pointer text-white hover:text-black"
          size="1.3rem"
        />
      </Link>
      <div className="bg-color flex flex-1 items-center justify-center rounded-md">
        {!showChat ? (
          <div className="h-screen w-full flex justify-center items-center bg-gradient-to-tr from-blue-900 to-blue-500">
            <div className="loginchat bg-image w-full sm:w-1/2 md:w-9/12 lg:w-1/2 mx-3 md:mx-5 lg:mx-0 shadow-md flex flex-col md:flex-row items-center rounded z-10 overflow-hidden bg-center bg-cover bg-blue-600">
              <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-opacity-25 bg-blue-600 backdrop">
                <h1 className="text-3xl md:text-4xl font-extrabold text-black my-2 md:my-0">
                  SEMANTICS
                </h1>
                <p className="mb-2 text-black font-extrabold hidden md:block font-mono">
                  Let's Join to Conversation
                </p>
              </div>
              <div className="w-full md:w-1/2 flex flex-col items-center bg-white py-5 md:py-8 px-4">
                <h3 className="mb-4 font-bold text-3xl flex items-center text-Black-500">
                  JOIN CHAT
                </h3>
                <form
                  action="#"
                  className="px-3 flex flex-col justify-center items-center w-full gap-3"
                >
                  <input
                    onChange={(ev) => {
                      setUsername(ev.target.value);
                    }}
                    type="text"
                    placeholder="Username..."
                    className="px-4 py-2 w-full rounded border border-gray-300 shadow-sm text-base placeholder-gray-500 placeholder-opacity-50 focus:outline-none focus:border-blue-500"
                  />
                  <input
                    onChange={(ev) => {
                      setRoom(ev.target.value);
                    }}
                    type="Text"
                    placeholder="Room ID..."
                    className="px-4 py-2 w-full rounded border border-gray-300 shadow-sm text-base placeholder-gray-500 placeholder-opacity-50 focus:outline-none focus:border-blue-500"
                  />
                  <button
                    onClick={joinRoom}
                    className="flex justify-center items-center bg-blue-500 hover:bg-blue-600 text-white focus:outline-none focus:ring rounded px-3 py-1"
                  >
                    <svg
                      className="w-5 h-5 inline"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                      ></path>
                    </svg>
                  </button>
                </form>
              </div>
            </div>
          </div>
        ) : (
          <Chatt socket={socket} username={username} room={room} />
        )}
      </div>
      <div className="mobileNav">
        <MobileNavbar />
      </div>
    </div>
  );
}

export default Chat;
