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

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <input
            type="text"
            placeholder="Jhonn..."
            onChange={(ev) => {
              setUsername(ev.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Room Id"
            onChange={(ev) => {
              setRoom(ev.target.value);
            }}
          />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <Chatt socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default Chat;
