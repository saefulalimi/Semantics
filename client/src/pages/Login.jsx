/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/action";
import { useHistory } from "react-router-dom";

import { Box, TextField, Button } from "@mui/material";

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
            label="Email"
            type="text"
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            required
            label="Password"
            type="password"
            autoComplete="off"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button variant="contained" onClick={handleSubmit}>
          Log-In
        </Button>
      </Box>
    </div>
  );
}

export default Login;
