import React from "react";
import { useState } from "react";
// import { styled } from "@mui/system";
import { Grid, Paper, TextField, Button } from "@mui/material";
// import "./css/form.css";
import axios from "axios";
import { useAuthContext } from "../hooks/index.js";
// import Api from "./Api/axiosapi";

const paperStyle = {
  padding: "30px 20px",
  width: 300,
  margin: "20px auto",
};
const headerStyle = { margin: 0 };
const textFieldStyle = { marginTop: "10px" };

export const Signup = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [profilepic, setProfilePic] = useState("");
  const { dispatch } = useAuthContext;

  async function postUser(e) {
    // e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("firstname", firstname);
      formData.append("lastname", lastname);
      formData.append("username", username);
      formData.append("password", password);
      formData.append("email", email);
      formData.append("profilepic", profilepic);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const response = axios
        .post(
          "http://127.0.0.1:8000/user/signup",
          formData,
          config,
          localStorage.setItems("user", JSON.stringify(response)),
          dispatch({ type: "LOGIN", payload: response })
        )
        .then((res) => {
          console.log(res, "axios data");
        })
        .catch((err) => {
          console.log("apierror", err);
        });
      if (response) {
        localStorage.setItems("user", JSON.stringify(response));
        dispatch({ type: "LOGIN", payload: response });
      }
      // console.log(response);
    } catch (err) {
      console.log("try error", err);
    }
  }

  function imgHandler(e) {
    let item = e.target.files[0];
    setProfilePic(item);
  }

  return (
    <Grid>
      <Paper style={paperStyle}>
        <Grid align="center">
          <h2 style={headerStyle}> Signup</h2>
        </Grid>
        <form
          onSubmit={postUser}
          className="modelform"
          encType="multipart/form-data"
        >
          <TextField
            fullWidth
            style={textFieldStyle}
            type="file"
            filename="profilepic"
            onChange={imgHandler}
          />

          <TextField
            style={textFieldStyle}
            label="First Name"
            fullWidth
            type="text"
            value={firstname}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <TextField
            style={textFieldStyle}
            fullWidth
            label="Last Name"
            type="text"
            value={lastname}
            onChange={(e) => setLastName(e.target.value)}
          />
          <TextField
            style={textFieldStyle}
            fullWidth
            label="Email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            style={textFieldStyle}
            fullWidth
            label="Username"
            type="text"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
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
            Signup
          </Button>
        </form>
      </Paper>
    </Grid>
  );
};
