import React from "react";
import { Link } from "react-router-dom";
import Logo from '../../assets/logo.png'

function NavigateHome() {
    return (
      <div>
        <nav class="navbar navbar-light bg-light">
          <a class="navbar-brand ms-5 fw-bold" href="#">
            <img src={Logo} width="30" height="30" class="d-inline-block align-top" alt=""/>
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
    );
  }
  
  export default NavigateHome;