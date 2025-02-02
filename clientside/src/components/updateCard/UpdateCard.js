// import React from "react";
// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router";
// import { Grid, Paper, TextField, Button } from "@mui/material";
// // import "./css/form.css";
// import axios from "axios";
// // import Api from "./Api/axiosapi";

// const paperStyle = {
//   padding: "30px 20px",
//   width: 300,
//   margin: "20px auto",
// };
// const headerStyle = { margin: 0 };
// const textFieldStyle = { marginTop: "10px" };

// const UpdateCard = () => {
//   const [firstname, setFirstName] = useState("");
//   const [category, setCategory] = useState("");
//   const [img, setImg] = useState(null);
//   const [profilepic, setProfilePic] = useState(null);
//   const [title, setTitle] = useState("");
//   const [desc, setDesc] = useState("");
//   const [goal, setGoal] = useState("");
//   const [raised, setRaised] = useState("");

//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const { _id } = useParams();
//   console.log(_id, "id");
//   useEffect(() => {
//     async function getPost() {
//       const token = localStorage.getItem("token");
//       const res = await axios.get(
//         `http://127.0.0.1:8000/posts/singlepost/${_id}`,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       console.log(res, "response");
//       setPost(res.data);
//       setFirstName(res.data.userId.firstname);
//       setCategory(res.data.category);
//       setTitle(res.data.title);
//       setDesc(res.data.description);
//       setGoal(res.data.goal);
//       setRaised(res.data.raised);
//       setImg(res.data.img);
//       setProfilePic(res.data.userId.profilepic);
//     }
//     getPost();
//   }, [_id]);

//   // const handleUpdate = async () => {
//   //   try {
//   //     return (
//   //       await axios.put("http://127.0.0.1:8000/cause/" + path),
//   //       {
//   //         data: { username: post.username },
//   //       }
//   //     );
//   //   } catch (err) {
//   //     console.log("try error", err);
//   //   }
//   // };

//   async function updatePost(e) {
//     e.preventDefault();

//     try {
//       const formData = new FormData();
//       formData.append("img", img);
//       formData.append("firstname", firstname);
//       formData.append("category", category);
//       formData.append("profilepic", profilepic);
//       formData.append("title", title);
//       formData.append("description", desc);
//       formData.append("goal", goal);
//       formData.append("raised", raised);

//       const config = {
//         headers: {
//           "content-type": "multipart/form-data",
//         },
//       };
//       axios
//         .put(`http://127.0.0.1:8000/cause/${_id}`, formData, config)
//         .then((data) => {
//           window.location.reload("/");
//           return data;
//         })
//         .catch((err) => {
//           console.log("apierror", err);
//         });
//     } catch (err) {
//       console.log("try error", err);
//     }
//   }

//   function usernameHandler(e) {
//     let item = e.target.value;
//     console.log(item);
//     setFirstName(item);
//   }

//   function imgHandler(e) {
//     let item = e.target.files[0];
//     console.log(item);
//     setImg(item);
//   }

//   function avatarHandler(e) {
//     let item = e.target.files[0];
//     console.log(item);
//     setProfilePic(item);
//   }

//   return (
//     <Grid>
//       <Paper style={paperStyle}>
//         <Grid align="center">
//           <h2 style={headerStyle}> Update Data</h2>
//         </Grid>
//         <form
//           onSubmit={updatePost}
//           className="updateform"
//           encType="multipart/form-data"
//         >
//           <TextField
//             style={textFieldStyle}
//             label="Name"
//             fullWidth
//             value={firstname}
//             type="text"
//             onChange={usernameHandler}
//           />

//           <TextField
//             style={textFieldStyle}
//             fullWidth
//             label="Category"
//             type="text"
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//           />

//           <TextField
//             fullWidth
//             style={textFieldStyle}
//             type="file"
//             filename={post.img}
//             onChange={imgHandler}
//           />

//           <TextField
//             style={textFieldStyle}
//             fullWidth
//             type="file"
//             filename="avatar"
//             onChange={avatarHandler}
//           />

//           <TextField
//             style={textFieldStyle}
//             fullWidth
//             label="Title"
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />

//           <TextField
//             style={textFieldStyle}
//             id="filled-multiline-flexible"
//             fullWidth
//             label="Description"
//             multiline
//             maxRows={4}
//             value={desc}
//             onChange={(e) => setDesc(e.target.value)}
//             // onChange={handleChange}
//           />

//           <TextField
//             style={textFieldStyle}
//             fullWidth
//             label="Goal"
//             type="number"
//             value={goal}
//             onChange={(e) => setGoal(e.target.value)}
//           />

//           <TextField
//             style={textFieldStyle}
//             label="Raised"
//             fullWidth
//             type="number"
//             value={raised}
//             onChange={(e) => setRaised(e.target.value)}
//           />

//           <Button
//             type="submit"
//             variant="contained"
//             // color="success"
//             style={textFieldStyle}
//           >
//             Post
//           </Button>
//         </form>
//       </Paper>
//     </Grid>
//   );
// };
// export default UpdateCard;
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import {
  Grid,
  Paper,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import axios from "axios";

const paperStyle = { padding: "30px 20px", width: 300, margin: "20px auto" };
const headerStyle = { margin: 0 };
const textFieldStyle = { marginTop: "10px" };

const UpdateCard = () => {
  const [firstname, setFirstName] = useState("");
  const [category, setCategory] = useState("");
  const [img, setImg] = useState(null);
  const [profilepic, setProfilePic] = useState(null);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [goal, setGoal] = useState("");
  const [raised, setRaised] = useState("");

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { _id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function getPost() {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `http://127.0.0.1:8000/posts/singlepost/${_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = res.data;
        console.log(data, "data");
        setFirstName(data.userId.firstname);
        setCategory(data.category);
        setTitle(data.title);
        setDesc(data.description);
        setGoal(data.goal);
        setRaised(data.raised);
        setImg(data.img);
        setProfilePic(data.userId.profilepic);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch post data.");
      }
    }
    getPost();
  }, [_id]);

  async function updatePost(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("img", img);
      formData.append("profilepic", profilepic);
      formData.append("firstname", firstname);
      formData.append("category", category);
      formData.append("title", title);
      formData.append("description", desc);
      formData.append("goal", goal);
      formData.append("raised", raised);
      // console.log(formData, "formdata");
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          // "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.put(`http://127.0.0.1:8000/cause/${_id}`, formData, config);
      navigate("/");
    } catch (err) {
      console.error("Update failed:", err);
      setError("Failed to update post. Please try again.");
    } finally {
      setLoading(false);
    }
  }
  function imgHandler(e) {
    let item = e.target.files[0];
    console.log(item);
    setImg(item);
  }

  function avatarHandler(e) {
    let item = e.target.files[0];
    console.log(item);
    setProfilePic(item);
  }
  return (
    <Grid>
      <Paper style={paperStyle}>
        <Grid align="center">
          <h2 style={headerStyle}> Update Data</h2>
        </Grid>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={updatePost} encType="multipart/form-data">
          <TextField
            style={textFieldStyle}
            label="Name"
            fullWidth
            value={firstname || ""}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            style={textFieldStyle}
            fullWidth
            label="Category"
            value={category || ""}
            onChange={(e) => setCategory(e.target.value)}
          />
          <TextField
            style={textFieldStyle}
            fullWidth
            type="file"
            InputLabelProps={{ shrink: true }}
            label="Post Image"
            // filename={img}
            onChange={imgHandler}
          />
          <TextField
            style={textFieldStyle}
            fullWidth
            type="file"
            // filename={profilepic}
            label="Profile Picture"
            InputLabelProps={{ shrink: true }}
            onChange={avatarHandler}
          />
          <TextField
            style={textFieldStyle}
            fullWidth
            label="Title"
            value={title || ""}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            style={textFieldStyle}
            fullWidth
            label="Description"
            multiline
            maxRows={4}
            value={desc || ""}
            onChange={(e) => setDesc(e.target.value)}
          />
          <TextField
            style={textFieldStyle}
            fullWidth
            label="Goal"
            type="number"
            value={goal || ""}
            onChange={(e) => setGoal(e.target.value)}
          />
          <TextField
            style={textFieldStyle}
            fullWidth
            label="Raised"
            type="number"
            value={raised || ""}
            onChange={(e) => setRaised(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            style={textFieldStyle}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Update"}
          </Button>
        </form>
      </Paper>
    </Grid>
  );
};

export default UpdateCard;
