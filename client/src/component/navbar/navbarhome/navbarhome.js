import React from 'react';
import logo from '../../../assets/logo.png'
// import './navbarhome.css'

function NavbarHome(){
    return(
        <nav class="navbar navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand">
            <img src={logo} alt="" width="30" height="24" class="d-inline-block align-text-top me-2"/>
            Semantics
          </a>
        </div>
      </nav>
    )
}
export default NavbarHome