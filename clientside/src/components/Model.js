import React from "react";
import { useState } from "react";
import { styled } from "@mui/system";
import { Grid, Paper, TextField, Button } from "@mui/material";
// import "./css/form.css";
import axios from "axios";
import Api from "./Api/axiosapi";

const paperStyle = {
  padding: "30px 20px",
  width: 300,
  margin: "20px auto",
};
const headerStyle = { margin: 0 };
const textFieldStyle = { marginTop: "10px" };

const Model = () => {
  const [username, setUserName] = useState("");
  const [category, setCategory] = useState("");
  const [img, setImg] = useState("");
  const [avatar, setAvatar] = useState("");
  const [desc, setDesc] = useState("");
  const [goal, setGoal] = useState("");
  const [raised, setRaised] = useState("");

  async function getPost(e) {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("img", img);
      formData.append("username", username);
      formData.append("avatar", avatar);
      formData.append("description", desc);
      formData.append("goal", goal);
      formData.append("raised", raised);

      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      // const userPost = {
      //   username: username,
      //   img: img,
      //   avatar: avatar,
      //   category: category,
      //   description: desc,
      //   goal: goal,
      //   raised: raised,
      // };
      axios
        .post("http://127.0.0.1:8000/cause", formData, config)
        .then((data) => {
          console.log(data, "axios data");
        })
        .catch((err) => {
          console.log("apierror", err);
        });
    } catch (err) {
      console.log("try error", err);
    }
  }

  function usernameHandler(e) {
    let item = e.target.value;
    console.log(item);
    setUserName(item);
  }

  function imgHandler(e) {
    let item = e.target.files[0];
    console.log(item);
    setImg(item);
  }
  return (
    <Grid>
      <Paper style={paperStyle}>
        <Grid align="center">
          <h2 style={headerStyle}> Post Data</h2>
        </Grid>
        <form
          onSubmit={getPost}
          className="modelform"
          encType="multipart/form-data"
        >
          <TextField
            style={textFieldStyle}
            label="Name"
            fullWidth
            type="text"
            value={username}
            onChange={usernameHandler}
            required
          />

          <TextField
            style={textFieldStyle}
            fullWidth
            label="Category"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <TextField
            fullWidth
            style={textFieldStyle}
            type="file"
            filename="img"
            onChange={imgHandler}
          />

          <TextField
            style={textFieldStyle}
            fullWidth
            label="Avatar Url"
            type="text"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
          />

          <TextField
            style={textFieldStyle}
            fullWidth
            label="Description"
            multiline
            maxRows={4}
            type="text"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />

          <TextField
            style={textFieldStyle}
            fullWidth
            label="Goal"
            type="number"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          />

          <TextField
            style={textFieldStyle}
            label="Raised"
            fullWidth
            type="number"
            value={raised}
            onChange={(e) => setRaised(e.target.value)}
          />

          <Button
            type="submit"
            variant="contained"
            // color="success"
            style={textFieldStyle}
            onClick={() => {
              console.log("data etered");
            }}
          >
            Post
          </Button>
        </form>
      </Paper>
    </Grid>
  );
};

export default Model;
