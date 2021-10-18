import React from "react";
import { Link } from "react-router-dom";

function NavigateLogin() {
    return (
      <div>
        <ul className="nav justify-content-end">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/register">
              Register
            </Link>
          </li>
        </ul>
      </div>
    );
  }
  
  export default NavigateLogin;