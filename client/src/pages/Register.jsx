/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Logo from "../assets/logo.png";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Box, TextField, Button } from "@mui/material";
import "../style/register.css";
import { Link } from "react-router-dom";
import { register } from "../redux/action";
import WarningModal from "../component/modal/WarningModal";
import SuccessModal from "../component/modal/SuccessModal";
import ErrorModal from "../component/modal/ErrorModal";

// import NavigateReg from "../component/navbar/NavbarReg.js"

function Register() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirPass, setConfirPass] = useState("");
  const [modal, setModal] = useState("hidden");
  const [error, setError] = useState("");
  const [resCode, setResCode] = useState("");

  const closeModal = () => {
    setModal("hidden");
  };

  const cekModel = (resCode) => {
    if (resCode === 201) {
      return (
        <SuccessModal
          message={"Success Register Account"}
          closeModal={closeModal}
        />
      );
    } else if (resCode === 417) {
      return (
        <ErrorModal
          message={"All Input Must Be Filled In"}
          closeModal={closeModal}
        />
      );
    } else if (409) {
      return (
        <ErrorModal
          message={"Email Has Been Registered"}
          closeModal={closeModal}
        />
      );
    } else if (resCode === 400) {
      return (
        <WarningModal
          message={"All Input Must Be Filled In"}
          closeModal={closeModal}
        />
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      userName: userName,
      email: email,
      password: password,
      confir: confirPass,
    };
    try {
      const response = await dispatch(register(data)).then((res) => {
        console.log(res);
        if (res === 201) {
          setResCode(res);
          setModal("block");
          history.replace("/login");
        }
        setResCode(res);
        setModal("block");
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="homeReg">
      {/* <NavigateReg/> */}
      <div className="containerReg">
        <div className="wraperReg">
          <Box
            className="boxReg"
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <div className="handleReg">
              <div className="logoReg">
                <img src={Logo} alt="gambar-logo" />
              </div>
              <div className="introReg">
                <h1>Sign Up</h1>
                <p>to acces semantics you can have account</p>
              </div>
            </div>

            <div className="childReg">
              <div className="formReg">
                <input
                  className="childBox"
                  placeholder="  username"
                  required
                  label="Name"
                  type="text"
                  autoComplete="off"
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div className="formReg">
                <input
                  className="childBox"
                  placeholder="  email"
                  type="text"
                  required
                  label="Email"
                  autoComplete="off"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="formReg">
                <input
                  className="childBox"
                  placeholder="  password"
                  type="password"
                  required
                  label="Password"
                  autoComplete="off"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="formReg">
                <input
                  className="childBox"
                  placeholder="  confrim password"
                  required
                  label="Confirm Password"
                  type="password"
                  autoComplete="off"
                  onChange={(e) => setConfirPass(e.target.value)}
                />
              </div>
              <button className="btnReg" onClick={handleSubmit}>
                Register
              </button>
              <span>
                you have account?{" "}
                <Link to="/login" className="mengLink">
                  Login
                </Link>
              </span>
            </div>
          </Box>
        </div>
      </div>
      {resCode !== "" ? (
        <div
          className={`${modal} fixed z-10 inset-0 overflow-y-auto transition ease-in-out duration-300 my-auto md:my-28`}
        >
          {cekModel(resCode)}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Register;
