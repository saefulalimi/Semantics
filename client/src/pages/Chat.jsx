import Chat from "../component/chats/chat/chat";
import Process from "../component/chats/process/process";
import Home from "../component/chats/home/home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "../style/chat.scss";
import React from "react";
import io from "socket.io-client";

const socket = io.connect('/');

function Appmain(props) {
return (
    <React.Fragment>
    <div className="right">
        <Chat
        username={props.match.params.username}
        roomname={props.match.params.roomname}
        socket={socket}
        />
    </div>
    <div className="left">
        <Process />
    </div>
    </React.Fragment>
);
}

function App() {
return (
    <Router>
    <div className="App">
        <Switch>
        <Route path="/" exact>
            <Home socket={socket} />
        </Route>
        <Route path="/chat/:roomname/:username" component={Appmain} />
        </Switch>
    </div>
    </Router>
);
}

export default App;