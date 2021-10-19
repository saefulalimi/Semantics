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
      <div class="bg-color h-screen w-full flex justify-center items-center bg-gradient-to-tr ">
      {!showChat ? (
                <div class="loginchat w-full sm:w-1/2 md:w-9/12 lg:w-1/2 mx-3 md:mx-5 lg:mx-0 shadow-md flex flex-col md:flex-row items-center rounded-md z-10 overflow-hidden bg-center bg-cover bg-blue-600">
                {/* <img src={loginchat} alt="" srcset="" /> */}
                    <div class="w-full md:w-1/2 flex flex-col justify-center items-center bg-opacity-25 bg-yellow-700 backdrop">
                        <h3 class="mb-10 font-extrabold text-3xl flex items-center justify-center align-center">
                            SEMANTICS
                        </h3>
                        <p class="mb-2 text-black hidden md:block font-mono">
                        Lest Chat for Conversation
                        </p>
                    </div>
                    <div class="w-full md:w-1/2 flex flex-col items-center bg-white py-5 md:py-8 px-4">
                        <h3 class="mb-4 font-bold text-3xl flex items-center text-yellow-700">
                        JOIN CHAT
                        </h3>
                        <form class="px-3 flex flex-col justify-center items-center w-full gap-3">
                            <input 
                                onChange={(ev) => {
                                  setUsername(ev.target.value);
                                }} 
                                placeholder="Username..."
                                type="text" 
                                class="px-4 py-2 w-full rounded border border-gray-300 shadow-sm text-base placeholder-gray-500 placeholder-opacity-50 focus:outline-none focus:border-blue-500"
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
