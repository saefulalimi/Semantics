import React from "react";
import { Router, Switch, Route, Link } from "react-router-dom";

import HomePage from "./pages/HomePage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./utils/privateRoute";
import history from "./utils/history";
import Profile from "./pages/Profile";
import Activity from "./pages/Activity";

import Nav from "./component/navbar/Navbar";

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Nav>
          <Link to="/">Home</Link>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/profile">Proile</Link>
          <Link to="/activity">Activity</Link>
        </Nav>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/home" exact component={HomePage} />
          <Route path="/register" exact component={Register} />
          <Route path="/login" exact component={Login} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/activity" exact component={Activity} />
          <PrivateRoute path="/dashboard" exact component={Dashboard} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
