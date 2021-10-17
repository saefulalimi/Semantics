import React from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/action";
import { Link, useHistory } from "react-router-dom";
import logo from '../assets/logo.png'
import '../style/dashbord.css'
import Clock from '../component/clock/Clock'

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
              <button onClick={handleLogout}>Logout</button>
           </nav>
        </div>
        
        <div className="pagedas">
          <h2>Dashboard</h2>
          <h1><Clock/></h1>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
