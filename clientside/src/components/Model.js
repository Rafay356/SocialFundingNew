import React from "react";
import { useState } from "react";
import { styled } from "@mui/system";
import { Grid, Paper, TextField } from "@mui/material";
// import "./css/form.css";
// import axios from "axios";
import Api from "./Api/axiosapi";

const paperStyle = { padding: "30px 20px", width: 300, margin: "20px auto" };
const headerStyle = { margin: 0 };

const Model = ({ closeModel }) => {
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
      const userPost = {
        username: username,
        img: img,
        avatar: avatar,
        category: category,
        description: desc,
        goal: goal,
        raised: raised,
      };
      Api.post("http://localhost:3000", userPost)
        .then((data) => {
          console.log(data, "axios daat");
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
  return (
    <Grid>
      <Paper style={paperStyle}>
        <Grid align="center">
          <h2 style={headerStyle}> Post Data</h2>
        </Grid>
        <form onSubmit={getPost} className="modelform">
          <TextField
            label="Name"
            fullWidth
            type="text"
            value={username}
            onChange={usernameHandler}
          />

          <TextField
            fullWidth
            label="Category"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <TextField
            fullWidth
            label="Image Url"
            type="text"
            value={img}
            onChange={(e) => setImg(e.target.value)}
          />

          <TextField
            fullWidth
            label="Avatar Url"
            type="text"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
          />

          <TextField
            fullWidth
            label="Description"
            multiline
            maxRows={4}
            type="text"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />

          <TextField
            fullWidth
            label="Goal"
            type="number"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          />

          <TextField
            label="Raised"
            fullWidth
            type="number"
            value={raised}
            onChange={(e) => setRaised(e.target.value)}
          />

          <button type="submit">Post</button>
        </form>
      </Paper>
    </Grid>
  );
};

export default Model;
