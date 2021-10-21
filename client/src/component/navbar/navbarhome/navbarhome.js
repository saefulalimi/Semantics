import React from 'react';
import logo from '../../../assets/logo.png'
// import './navbarhome.css'

function NavbarHome(){
    return(
        <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <div className="navbar-brand">
            <img src={logo} alt="" width="30" height="24" className="d-inline-block align-text-top me-2"/>
            Semantics
          </div>
        </div>
      </nav>
    )
}
export default NavbarHome