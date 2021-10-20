/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/action";
import { useHistory } from "react-router-dom";
import "../style/register.css";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import { Box } from "@mui/material";
import ErrorModal from "../component/modal/ErrorModal";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const [error, setError] = useState("");
  const [modal, setModal] = useState("hidden");
  const dispatch = useDispatch();

  const closeModal = () => {
    setModal("hidden");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email: email,
      password: password,
    };

    try {
      const res = await dispatch(loginUser(data)).then((res) => {
        console.log(res);

        if (res === 400) {
          setError("Invalid Email/Password");
          setModal("block");
        } else {
          history.replace("/dashboard");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="homeReg">
      {/* <NavigateLog/> */}
      <div className="containerReg">
        <div className="wraperReg">
          <Box
            className="boxReg"
            component="form"
            sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <div className="handleReg">
              <div className="logoReg">
                <img src={Logo} alt="gambar-logo" />
              </div>
              <div className="introReg">
                <h1>Log In</h1>
                <p>Thankyou for join in Semantics</p>
              </div>
            </div>

            <div className="childReg">
              <div className="formReg">
                <input
                  className="childBox"
                  placeholder="  username"
                  label="Email"
                  type="text"
                  autoComplete="off"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="formReg">
                <input
                  className="childBox"
                  placeholder="  password"
                  label="Password"
                  type="password"
                  autoComplete="off"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button className="btnReg" onClick={handleSubmit}>
                Login
              </button>
              <span>
                create account?{" "}
                <Link to="/register" className="mengLink">
                  signup
                </Link>
              </span>
            </div>
          </Box>
        </div>
      </div>
      {/* hard code  */}

      {error !== "" ? (
        <div
          className={`${modal} fixed z-10 inset-0 overflow-y-auto transition ease-in-out duration-300 my-auto md:my-28`}
        >
          <ErrorModal
            message={"Invalid Email / Password"}
            closeModal={closeModal}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Login;
