import React from "react";
import { Link } from "react-router-dom";
import Logo from '../../assets/logo.png'

function NavigateHome() {
    return (
      <div>
        <div className="">
        <nav className="navbar navbar-light bg-light">
          <a className="navbar-brand flex ml-3" href="#">
            <img src={Logo} width="30" height="30" class="d-inline-block align-top" alt="" className="mr-2"/>
            Semantics
          </a>
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
        </nav>         
        </div>
      </div>
    );
  }
  
  export default NavigateHome;