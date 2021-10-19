/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Logo from '../assets/logo.png'
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Box, TextField, Button } from "@mui/material";
import '../style/register.css';
import { Link } from "react-router-dom"
import { register } from "../redux/action";
// import NavigateReg from "../component/navbar/NavbarReg.js"

function Register() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirPass, setConfirPass] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      userName: userName,
      email: email,
      password: password,
      confir: confirPass,
    };
    const response = await dispatch(register(data));
    history.replace("/login");
  };

  return (
    <div className="homeReg">
    {/* <NavigateReg/> */}
    <div className="containerReg">
      <div className="wraperReg">
        <Box className="boxReg" component="form" sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }} noValidate autoComplete="off" onSubmit={handleSubmit}>

          <div className="handleReg">
            <div className="logoReg">
              <img src={Logo} alt="gambar-logo"/>
            </div>
            <div className="introReg">
              <h1>Sign Up</h1>
              <p>to acces semantics you can have account</p>
            </div>
          </div>

          <div className="childReg">
            <div className="formReg">
              <input className="childBox" placeholder="  username" required label="Name" type="text" autoComplete="off"
              onChange={(e) => setUserName(e.target.value)} />
            </div>
            <div className="formReg">
              <input className="childBox" placeholder="  email" type="text" required label="Email" autoComplete="off"
              onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="formReg">
              <input className="childBox" placeholder="  password" type="password" required label="Password" autoComplete="off"
              onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="formReg">
              <input className="childBox" placeholder="  confrim password" required label="Confirm Password" type="password" autoComplete="off"
              onChange={(e) => setConfirPass(e.target.value)} />
            </div>
            <button className="btnReg" onClick={handleSubmit}>Register</button>
            <span>you can have account? <Link to="/login">Login</Link></span>
          </div>
        </Box>
      </div>
    </div>
   </div>
  );
}

export default Register;
