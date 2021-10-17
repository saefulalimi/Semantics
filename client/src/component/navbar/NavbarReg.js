import React from "react";
import { Link } from "react-router-dom";

function NavigateReg() {
    return (
      <div>
        <ul className="nav justify-content-end">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">
              Login
            </Link>
          </li>
        </ul>
      </div>
    );
  }
  
  export default NavigateReg;