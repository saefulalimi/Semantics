import React from 'react'
import "../style/chat.css";
import io from "socket.io-client";
import { useState } from "react";
import Chatt from "../component/chat/Chatt";



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

  return(
    <div>
      <div class="bg-color flex flex-1 items-center justify-center">
      {!showChat ? (
                <div class="sm:border-2 px-4 lg:px-24 py-16 lg:max-w-xl sm:max-w-md w-1/2 rounded-md text-center">
                    <div class="">
                        <h3 class="font-bold tracking-wider text-3xl mb-8 w-full text-black-600">
                            SEMANTICS
                        </h3>
                        <p class="mb-2 text-black hidden md:block font-mono">
                        Let's Chat for Conversation
                        </p>
                    </div>
                    <div class="w-full md:w-1/2  flex flex-col items-center bg-white py-5 md:py-8 px-6 rounded-md  ">
                        {/* <h3 class="mb-4 font-bold text-3xl flex items-center text-yellow-700">
                        JOIN CHAT
                        </h3> */}
                        <form class="space-y-4">
                            <input 
                                onChange={(ev) => {
                                  setUsername(ev.target.value);
                                }} 
                                placeholder="Username..."
                                type="text" 
                                class="bg-gray-200 border-2 border-gray-100 focus:outline-none bg-gray-100 block w-full py-2 px-4 rounded-lg focus:border-gray-700"
                            />
                            <input 
                                onChange={(ev) => {
                                  setRoom(ev.target.value);
                                }} 
                                placeholder="Room ID..."
                                type="text" 
                                class="px-4 py-2 w-full rounded border border-gray-300 shadow-sm text-base placeholder-gray-500 placeholder-opacity-50 focus:outline-none focus:border-blue-500"
                            />
                            <button onClick={joinRoom} class="px-10 py-1">
                                <p class="text-Black font-bold text-lg focus:outline-none focus:ring border border-gray-300 w-full px-4 py-2 bg-blue-500 rounded-md">Join Chat</p>
                            </button>
                        </form>
                    </div>
                </div>
                ) : (
                  <Chatt socket={socket} username={username} room={room} />
                )}
            </div>
    </div>
  )
}

export default Chat;
