import React from "react";
import { Link } from "react-router-dom";
import './Mobile.css'

import { FiUsers } from "react-icons/fi";
import { BiNotepad, BiNote, BiCalendarPlus, BiChat} from "react-icons/bi";

function MobileNavbar() {
  return (
    <div className="bodyMob">
      <div className="GenNot">
        <Link to="/general-note"><BiNote className="wid"/></Link>
        </div>
      <div className="Cale">
        <Link to="/calendar"><BiCalendarPlus className="wid" /></Link>
      </div>
      <div className="NoteMvp">
        <Link to="/activity"><BiNotepad className="wid" /></Link>
        </div>
      <div className="Gpchat">
        <Link><BiChat className="wid" /></Link>
        </div>
      <div className="Propf">
        <Link to="/profile"><FiUsers className="wid" /></Link>
        </div>
    </div>
  );
}

export default MobileNavbar;
