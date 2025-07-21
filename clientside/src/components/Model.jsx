import { useState } from "react";

import {
  Grid,
  TextField,
  Button,
  Typography,
  Container,
  Box,
  CircularProgress,
} from "@mui/material";
import "./css/form.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { isTokenExpired } from "../utils/auth";

const PostModel = () => {
  // const [username, setUserName] = useState("");
  const [username] = useState(() => {
    const currentUser = JSON.parse(localStorage.getItem("user")) || {};
    return currentUser.username || "";
  });

  const [category, setCategory] = useState("");
  const [img, setImg] = useState("");
  const [avatar, setAvatar] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [goal, setGoal] = useState("");
  const [raised, setRaised] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [profilePreview, setProfilePreview] = useState(null);

  const navigate = useNavigate();

  async function getPost(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const token = localStorage.getItem("token");
    if (!token || isTokenExpired(token)) {
      setError("Your session has expired. Please log in again.");
      setLoading(false);
      setTimeout(() => navigate("/auth/signin"), 2000);
      return;
    }
    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("category", category);
      formData.append("img", img);
      formData.append("title", title);
      formData.append("description", desc);
      formData.append("goal", goal);
      formData.append("raised", raised);
      formData.append("avatar", avatar);

      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${token}` || "",
        },
      };

      axios
        .post("http://127.0.0.1:8000/cause", formData, config)
        .then((data) => {
          console.log(data, "axios data");
          navigate("/");
        })
        .catch((err, data) => {
          console.log("apierror", err, data);
          if (err.response?.status === 401) {
            setError("Your session has expired. Please log in again.");
            setTimeout(() => navigate("/auth/signin"), 2000);
          } else {
            setError(err.response?.data?.message || "Failed to create post.");
          }
        });
    } catch (err) {
      console.log("try error", err);
      setLoading(false);
    }
  }

  // function usernameHandler(e) {
  //   let item = e.target.value;
  //   // console.log(item);
  //   setUserName(item);
  // }

  // function imgHandler(e) {
  //   let item = e.target.files[0];

  //   setImg(item);
  // }

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "img") {
      setImg(files[0]);
      setProfilePreview(URL.createObjectURL(files[0]));
    } else {
      setImg(value);
    }

    setError("");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Post Data
        </Typography>
        <Box
          component="form"
          onSubmit={getPost}
          // className="modelform"
          encType="multipart/form-data"
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                // style={textFieldStyle}
                label="Username"
                fullWidth
                type="text"
                value={username}
                disabled
                // onChange={usernameHandler}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                // style={textFieldStyle}
                fullWidth
                error={Boolean(error)}
                label="Category"
                type="text"
                value={category}
                helperText={error}
                required
                onChange={(e) => setCategory(e.target.value)}
                sx={(theme) => ({
                  "& .MuiFormHelperText-root": {
                    color: theme.palette.error.main,
                  },
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": {
                      borderColor: theme.palette.primary.main, // Hover border color
                    },
                  },
                })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                // style={textFieldStyle}
                label="Post Image"
                type="file"
                filename="img"
                name="img"
                required
                InputLabelProps={{ shrink: true }}
                inputProps={{ accept: "image/*" }}
                onChange={handleChange}
                sx={(theme) => ({
                  "& .MuiFormHelperText-root": {
                    color: theme.palette.error.main,
                  },
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": {
                      borderColor: theme.palette.primary.main, // Hover border color
                    },
                  },
                })}
              />
              {profilePreview && (
                <Box sx={{ mt: 2 }}>
                  <img
                    src={profilePreview}
                    alt="Profile Preview"
                    style={{
                      width: "100%",
                      maxHeight: "200px",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                // style={textFieldStyle}
                fullWidth
                label="Title"
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                // style={textFieldStyle}
                id="filled-multiline-flexible"
                fullWidth
                label="Description"
                multiline
                maxRows={4}
                value={desc}
                required
                onChange={(e) => setDesc(e.target.value)}
                // onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                // style={textFieldStyle}
                fullWidth
                label="Goal"
                type="number"
                value={goal}
                required
                onChange={(e) => setGoal(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                // style={textFieldStyle}
                label="Raised"
                fullWidth
                type="number"
                value={raised}
                required
                onChange={(e) => setRaised(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color={error ? "error" : "primary"}
            sx={(theme) => ({
              mt: 3,
              mb: 2,

              "&:hover": {
                backgroundColor: error ? "red" : theme.palette.primary.main,
              },
            })}
            disabled={loading || !username}
          >
            {loading ? <CircularProgress size={24} /> : "Post"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default PostModel;
