import React from "react";
import { useState, useEffect } from "react";
import { Grid, Paper, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
// import "./css/form.css";
import axios from "axios";
// import Api from "./Api/axiosapi";

const paperStyle = {
  padding: "30px 20px",
  width: 300,
  margin: "20px auto",
};
const headerStyle = { margin: 0 };
const textFieldStyle = { marginTop: "10px" };

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function getUser(e) {
    e.preventDefault();

    const userLogin = {
      email: email,
      password: password,
    };
    const result = await axios.post(
      "http://127.0.0.1:8000/user/login",
      userLogin,
      {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userLogin),
      }
    );
    if (result) {
      localStorage.setItem("user", JSON.stringify(result));
      navigate("/");
    } else {
      console.log(result);
    }
  }
  function emailHandler(e) {
    let item = e.target.value;
    setEmail(item);
  }

  return (
    <Grid>
      <Paper style={paperStyle}>
        <Grid align="center">
          <h2 style={headerStyle}> Login</h2>
        </Grid>
        <form onSubmit={getUser} className="loginform">
          <TextField
            style={textFieldStyle}
            label="Email"
            fullWidth
            value={email}
            type="text"
            onChange={emailHandler}
          />

          <TextField
            style={textFieldStyle}
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            type="submit"
            variant="contained"
            // color="success"
            style={textFieldStyle}
          >
            Login
          </Button>
        </form>
      </Paper>
    </Grid>
  );
};
