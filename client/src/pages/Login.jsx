/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/action";
import { useHistory } from "react-router-dom";
import '../style/register.css'
import { Link } from "react-router-dom"
import Logo from '../assets/logo.png'
import { Box, TextField, Button } from "@mui/material";
// import NavigateLog from "../component/navbar/NavbarLogin"

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email: email,
      password: password,
    };

    const res = await dispatch(loginUser(data)).then(() => {
      history.replace("/dashboard");
    });
  };

  return (
    <div className="homeReg">
      {/* <NavigateLog/> */}
    <div className="containerReg">
      <div className="wraperReg">
      <Box className="boxReg" component="form" sx={{"& .MuiTextField-root": { m: 1, width: "25ch" }, }}
        noValidate autoComplete="off" onSubmit={handleSubmit}>

        <div className="handleReg">
            <div className="logoReg">
              <img src={Logo} alt="gambar-logo"/>
            </div>
            <div className="introReg">
              <h1>Log In</h1>
              <p>Thankyou for join in Semantics</p>
            </div>
          </div>

         <div className="childReg">
            <div className="formReg">
              <input className="childBox" placeholder="  username" label="Email" type="text" autoComplete="off" onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="formReg">
              <input className="childBox" placeholder="  password" label="Password" type="password" autoComplete="off" onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <button className="btnReg" onClick={handleSubmit}>Login</button>
            <span>create account? <Link to="/register" className="mengLink"> signup</Link></span>
        </div>
      </Box>
      </div>
    </div>
  </div>
  );
}

export default Login;
