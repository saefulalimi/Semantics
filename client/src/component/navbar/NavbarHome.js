import React from "react";
import { Link } from "react-router-dom";

function NavigateHome() {
    return (
      <div>
        <ul className="nav justify-content-end">
          <li className="nav-item">
            <Link className="nav-link" to="/register">
              Register
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">
              Log-In
            </Link>
          </li>
        </ul>
      </div>
    );
  }
  
  export default NavigateHome;