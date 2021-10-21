import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/action";
import { Link, useHistory } from "react-router-dom";
import { FiUsers } from "react-icons/fi";
import {
  BiNotepad,
  BiNote,
  BiCalendarPlus,
  BiExit,
  BiChat,
} from "react-icons/bi";
import axios from "axios";

import Clock from "../component/clock/Clock";
import Modal from "../component/modal/Modal";
import MobileNavbar from "../component/navbar/mobile/MobileNavbar";

import bck2 from "../assets/bck2.png";
import logo from "../assets/logo.png";
import "../style/dashbord.css";

function Dashboard() {
  const history = useHistory();
  let dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const response = await dispatch(logoutUser());
      console.log("sucess logout", response);
      history.replace("/login");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      await axios
        .get("https://api.quotable.io/random")
        .then((res) => console.log(res));
    }
    fetchData();
  }, []);

  return (
    <div className="bodydashboard">
      <div className="dashboardapp">
        <div className="dashboardpar">
          <div className="logodas">
            <img src={logo} alt=".." />
            <h6>Semantics Apps</h6>
          </div>
          <nav className="navdash">
            <Link className="childdas" to="/profile">
              <FiUsers className="iconedas" />
              Profile
            </Link>
            <Link className="childdas" to="/activity">
              <BiNotepad className="iconedas" />
              Activity
            </Link>
            <Link className="childdas" to="/general-note">
              <BiNote className="iconedas" />
              General Note
            </Link>
            <Link className="childdas" to="/chat">
              <BiChat className="iconedas" />
              Live Chat
            </Link>
            <Link className="childdas" to="/calendar">
              <BiCalendarPlus className="iconedas" />
              Calendar
            </Link>
            <button className="btn-logout" onClick={handleLogout}>
              Logout
            </button>
          </nav>
        </div>

        <div className="pagedas">
          <div className="dasheade">
            <div className="dashnavrig">
              <img src={logo} alt="img-logo" width="" height="" />
              <h6>Semantics App</h6>
            </div>
            <div className="dashnavlef">
              <button className="btn-logout-icone" onClick={handleLogout}>
                <BiExit className="iconeExit" />
              </button>
              <Modal />
            </div>
          </div>
          <div className="clockdas1">
            <div className="clock1">
              <Clock className="clcokfix" />
            </div>
          </div>
          <div className="imgbck2">
            <div className="imgbc2">
              <img src={bck2} alt="" />
            </div>
          </div>
          <div className="clockdas ">
            <Clock className="clcokfix" />
          </div>
        </div>
        <div className="greetdas">
          <h3>Welcome to Semantics App!</h3>
        </div>
      </div>
      <div className="mobileNav">
        <MobileNavbar />
      </div>
    </div>
  );
}

export default Dashboard;
