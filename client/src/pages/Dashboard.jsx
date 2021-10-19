import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/action";
import { Link, useHistory } from "react-router-dom";
import { FiUsers } from "react-icons/fi";
import { BiNotepad, BiNote, BiCalendarPlus, BiExit} from "react-icons/bi";

import Clock from '../component/clock/Clock'
import Modal from '../component/modal/Modal'
import MobileNavbar from '../component/navbar/mobile/MobileNavbar'


import bck2 from '../assets/bck2.png'
import logo from '../assets/logo.png'
import '../style/dashbord.css'

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

  return (
    <div className="bodydashboard">
      <div className="dashboardapp">
        <div className="dashboardpar">
            <div className="logodas">
              <img src={logo} alt="" srcset="" />
              <h6>Semantics Apps</h6>
            </div>
          <nav className="navdash">
            <Link className="childdas" to="/profile">
                 <FiUsers className="iconedas"/> Profile
              </Link>
              <Link className="childdas" to="/activity">
                  <BiNotepad className="iconedas"/>Activity
              </Link>
              <Link className="childdas" to="/general-note">
                  <BiNote className="iconedas"/>General Note
              </Link>
              <Link className="childdas" to="/calendar">
                  <BiCalendarPlus className="iconedas"/>Calendar
              </Link>
              
           </nav>
        </div>
        
        
        <div className="pagedas">
          <div className="dasheade">
            <button className="btn-logout" onClick={handleLogout}>Logout</button>
            <button className="btn-logout-icone" onClick={handleLogout}><BiExit className="iconeExit"/></button>
            <Modal/>
          </div>
          <div className="imgbck2">
            <div className="imgbc2">
            <img src={bck2}/>
              </div> 
          </div>
          <div className="clockdas">
            <Clock/>
            </div>
        </div>

      </div>
      <div className="mobileNav">
      <MobileNavbar />
      </div>
    </div>
  );
}

export default Dashboard;
