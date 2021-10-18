import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/action";
import { Link, useHistory } from "react-router-dom";

import Clock from '../component/clock/Clock'


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
    <div>
      <div className="dashboardapp">
        <div className="dashboardpar">
            <div className="logodas">
              <img src={logo} alt="" srcset="" />
              <h6>Semantics Apps</h6>
            </div>
          <nav className="navdash">
            <Link className="childdas" to="/profile">
                 Profile
              </Link>
              <Link className="childdas" to="/activity">
                  Activity
              </Link>
              <Link className="childdas" to="/general-note">
                  General Note
              </Link>
              <Link className="childdas" to="/calendar">
                  Calendar
              </Link>
              <button className="btn-logout" onClick={handleLogout}>Logout</button>
           </nav>
        </div>
        
        
        <div className="pagedas">
          <div className="bodydas1">
            <h5>Dashboard Semantics Apps</h5>
            
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
    </div>
  );
}

export default Dashboard;
