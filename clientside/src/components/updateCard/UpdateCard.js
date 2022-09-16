import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { Grid, Paper, TextField, Button } from "@mui/material";
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

const UpdateCard = () => {
  const [username, setUserName] = useState("");
  const [category, setCategory] = useState("");
  const [img, setImg] = useState("");
  const [avatar, setAvatar] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [goal, setGoal] = useState("");
  const [raised, setRaised] = useState("");

  const location = useLocation();
  const path = location.pathname.split("/")[3];
  console.log(path);
  const [post, setPost] = useState({});

  useEffect(() => {
    async function getPost() {
      const res = await axios.get(
        "http://127.0.0.1:8000/posts/singlepost/" + path
      );
      console.log("res", res.data.img);

      setPost(res.data);
      setUserName(res.data.username);
      setCategory(res.data.category);
      setTitle(res.data.title);
      setDesc(res.data.description);
      setGoal(res.data.goal);
      setRaised(res.data.raised);
      setImg(res.data.img);
      setAvatar(res.data.avatar);
    }
    getPost();
  }, [path]);

  // const handleUpdate = async () => {
  //   try {
  //     return (
  //       await axios.put("http://127.0.0.1:8000/cause/" + path),
  //       {
  //         data: { username: post.username },
  //       }
  //     );
  //   } catch (err) {
  //     console.log("try error", err);
  //   }
  // };

  async function updatePost(e) {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("img", img);
      formData.append("username", username);
      formData.append("category", category);
      formData.append("avatar", avatar);
      formData.append("title", title);
      formData.append("description", desc);
      formData.append("goal", goal);
      formData.append("raised", raised);

      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      axios
        .put("http://127.0.0.1:8000/cause/" + path, formData, config)
        .then((data) => {
          console.log(data, "axios data");
          window.location.reload("/");
          return data;
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

  function avatarHandler(e) {
    let item = e.target.files[0];
    console.log(item);
    setAvatar(item);
  }

  return (
    <Grid>
      <Paper style={paperStyle}>
        <Grid align="center">
          <h2 style={headerStyle}> Update Data</h2>
        </Grid>
        <form
          onSubmit={updatePost}
          className="updateform"
          encType="multipart/form-data"
        >
          <TextField
            style={textFieldStyle}
            label="Name"
            fullWidth
            value={username}
            type="text"
            onChange={usernameHandler}
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
            filename={post.img}
            onChange={imgHandler}
          />

          <TextField
            style={textFieldStyle}
            fullWidth
            type="file"
            filename="avatar"
            onChange={avatarHandler}
          />

          <TextField
            style={textFieldStyle}
            fullWidth
            label="Title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <TextField
            style={textFieldStyle}
            id="filled-multiline-flexible"
            fullWidth
            label="Description"
            multiline
            maxRows={4}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            // onChange={handleChange}
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
          >
            Post
          </Button>
        </form>
      </Paper>
    </Grid>
  );
};
export default UpdateCard;
