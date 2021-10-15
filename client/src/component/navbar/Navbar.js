import React from "react";
import { Link } from "react-router-dom";

function Navigate() {
  return (
    <div>
      <ul className="nav justify-content-center">
        <li className="nav-item">
          <Link className="nav-link active" to="/">
            Home
          </Link>
        </li>
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
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard">
            Dashboard
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Navigate;
