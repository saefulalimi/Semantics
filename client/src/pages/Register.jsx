/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Axios from "axios";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Box, TextField, Button } from "@mui/material";

import { register } from "../redux/action";

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
    <div>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <div>
          <TextField
            required
            label="Name"
            type="text"
            autoComplete="off"
            onChange={(e) => setUserName(e.target.value)}
          />
          <TextField
            type="text"
            required
            label="Email"
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            type="password"
            required
            label="Password"
            autoComplete="off"
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            required
            label="Confirm Password"
            type="password"
            autoComplete="off"
            onChange={(e) => setConfirPass(e.target.value)}
          />
        </div>
        <Button variant="contained" onClick={handleSubmit}>
          Register
        </Button>
      </Box>
    </div>
  );
}

export default Register;
