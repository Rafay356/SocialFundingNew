// import React from "react";
// import { useState } from "react";
// // import { styled } from "@mui/system";
// import {
//   Grid,
//   TextField,
//   Button,
//   Container,
//   Box,
//   Typography,
//   Alert,
//   CircularProgress,
// } from "@mui/material";
// // import "./css/form.css";
// import axios from "axios";
// import { useAuthContext } from "../hooks/index.js";
// // import Api from "./Api/axiosapi";
// // import { useNavigate } from "react-router-dom";
// import { useNavigate, Link } from "react-router-dom";

// // const paperStyle = {
// //   padding: "30px 20px",
// //   width: 300,
// //   margin: "20px auto",
// // };
// // const headerStyle = { margin: 0 };
// // const textFieldStyle = { marginTop: "10px" };

// export const Signup = () => {
//   // debugger;
//   // const [username, setUserName] = useState("");
//   // const [password, setPassword] = useState("");
//   // const [email, setEmail] = useState("");
//   // const [firstname, setFirstName] = useState("");
//   // const [lastname, setLastName] = useState("");
//   // const [profilepic, setProfilePic] = useState("");
//   const [formData, setFormData] = useState({
//     firstname: "",
//     lastname: "",
//     username: "",
//     password: "",
//     email: "",
//     profilepic: null,
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState({});
//   const { dispatch } = useAuthContext();
//   const navigate = useNavigate();
//   console.log(error, "error");
//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: files ? files[0] : value,
//     }));
//     console.log(formData);
//     // Clear error when user starts typing
//     setError((prev) => ({
//       ...prev,
//       [name]: "",
//     }));
//   };

//   // function imgHandler(e) {
//   //   let item = e.target.files[0];
//   //   setProfilePic(item);
//   // }

//   // async function postUser(e) {
//   //   e.preventDefault();
//   //   try {
//   //     const formData = new FormData();
//   //     formData.append("firstname", firstname);
//   //     formData.append("lastname", lastname);
//   //     formData.append("username", username);
//   //     formData.append("password", password);
//   //     formData.append("email", email);
//   //     formData.append("profilepic", profilepic);

//   //     const config = {
//   //       headers: {
//   //         "Content-Type": "multipart/form-data",
//   //       },
//   //     };

//   //     // Send POST request

//   //     const response = await axios.post(
//   //       "http://127.0.0.1:8000/user/signup",
//   //       formData,
//   //       config
//   //     );
//   //     // Store user data in localStorage
//   //     localStorage.setItem("user", JSON.stringify(response.data));

//   //     // Dispatch login action
//   //     dispatch({ type: "LOGIN", payload: response.data });
//   //     // Navigate to login page
//   //     <Navigate to="/auth/signin" />;
//   //   } catch (err) {
//   //     console.error("Signup error", err.response?.data || err.message);
//   //   }
//   // }
//   async function handleSubmit(e) {
//     e.preventDefault();
//     console.log(formData);
//     setLoading(true);
//     setError({});
//     // try {
//     const formDataToSend = new FormData();
//     Object.keys(formData).forEach((key) => {
//       formDataToSend.append(key, formData[key]);
//     });

//     const response = await axios.post(
//       "http://127.0.0.1:8000/user/signup",
//       formDataToSend,
//       {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       }
//     );
//     console.log(response);
//     if (response.status === 200) {
//       localStorage.setItem("user", JSON.stringify(response.data));
//       dispatch({ type: "LOGIN", payload: response.data });
//       navigate("/auth/signin");
//     } else if (response.status === 400) {
//       e.preventDefault();
//       setError({ general: response.data.message });
//     } else {
//       setError({ general: "An error occurred during registration" });
//     }
//   }
//   // catch (err) {
//   //   debugger;
//   //   console.error("Signup error", err.response?.data || err.message);
//   //   if (err.response?.data?.message) {
//   //     if (err.response.data.message.includes("Email")) {
//   //       setError((prev) => ({ ...prev, email: err.response.data.message }));
//   //     }
//   //     if (err.response.data.message.includes("Username")) {
//   //       setError((prev) => ({
//   //         ...prev,
//   //         username: err.response.data.message,
//   //       }));
//   //     }
//   //   } else {
//   //     setError({ general: "An error occurred during registration" });
//   //   }
//   // } finally {
//   //   setLoading(false);
//   // }
//   // }

//   return (
//     <Container component="main" maxWidth="xs">
//       <Box
//         sx={{
//           marginTop: 8,
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//         }}
//       >
//         <Typography component="h1" variant="h5">
//           Sign up
//         </Typography>

//         {error.general && (
//           <Alert severity="error" sx={{ width: "100%", mt: 2 }}>
//             {error.general}
//           </Alert>
//         )}

//         <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
//           <Grid container spacing={2}>
//             <Grid item xs={12}>
//               <TextField
//                 required
//                 fullWidth
//                 name="email"
//                 label="Email Address"
//                 type="email"
//                 color={error.email ? "error" : "primary"}
//                 value={formData.email}
//                 onChange={handleChange}
//                 error={Boolean(error.email)}
//                 helperText={error.email}
//                 sx={{
//                   "& .MuiFormHelperText-root": {
//                     color: "error.main",
//                   },
//                 }}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 required
//                 fullWidth
//                 name="username"
//                 label="Username"
//                 value={formData.username}
//                 onChange={handleChange}
//                 error={Boolean(error.username)}
//                 helperText={error.username}
//                 sx={{
//                   "& .MuiFormHelperText-root": {
//                     color: "error.main",
//                   },
//                 }}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 required
//                 fullWidth
//                 name="firstname"
//                 label="First Name"
//                 value={formData.firstname}
//                 onChange={handleChange}
//                 error={Boolean(error.firstname)}
//                 helperText={error.firstname}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 required
//                 fullWidth
//                 name="lastname"
//                 label="Last Name"
//                 value={formData.lastname}
//                 onChange={handleChange}
//                 error={Boolean(error.lastname)}
//                 helperText={error.lastname}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 required
//                 fullWidth
//                 name="password"
//                 label="Password"
//                 type="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 error={Boolean(error.password)}
//                 helperText={error.password}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 required
//                 fullWidth
//                 name="profilepic"
//                 label="Profile Picture"
//                 type="file"
//                 onChange={handleChange}
//                 error={Boolean(error.profilepic)}
//                 helperText={error.profilepic}
//               />
//             </Grid>
//           </Grid>

//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             sx={{ mt: 3, mb: 2 }}
//             disabled={loading}
//           >
//             Sign Up
//             {/* {loading ? <CircularProgress size={24} /> : "Sign Up"} */}
//           </Button>

//           <Grid container justifyContent="flex-end">
//             <Grid item>
//               <Link to="/auth/signin" style={{ textDecoration: "none" }}>
//                 Already have an account? Sign in
//               </Link>
//             </Grid>
//           </Grid>
//         </Box>
//       </Box>
//     </Container>
//     // <Grid>
//     //   <Paper style={paperStyle}>
//     //     <Grid align="center">
//     //       <h2 style={headerStyle}> Signup</h2>
//     //     </Grid>
//     //     <form
//     //       onSubmit={postUser}
//     //       className="modelform"
//     //       encType="multipart/form-data"
//     //     >
//     //       <TextField
//     //         fullWidth
//     //         style={textFieldStyle}
//     //         type="file"
//     //         filename="profilepic"
//     //         onChange={imgHandler}
//     //       />

//     //       <TextField
//     //         style={textFieldStyle}
//     //         label="First Name"
//     //         fullWidth
//     //         type="text"
//     //         value={firstname}
//     //         onChange={(e) => setFirstName(e.target.value)}
//     //       />

//     //       <TextField
//     //         style={textFieldStyle}
//     //         fullWidth
//     //         label="Last Name"
//     //         type="text"
//     //         value={lastname}
//     //         onChange={(e) => setLastName(e.target.value)}
//     //       />
//     //       <TextField
//     //         style={textFieldStyle}
//     //         fullWidth
//     //         label="Email"
//     //         type="text"
//     //         value={email}
//     //         onChange={(e) => setEmail(e.target.value)}
//     //       />

//     //       <TextField
//     //         style={textFieldStyle}
//     //         fullWidth
//     //         label="Username"
//     //         type="text"
//     //         value={username}
//     //         onChange={(e) => setUserName(e.target.value)}
//     //       />

//     //       <TextField
//     //         style={textFieldStyle}
//     //         fullWidth
//     //         label="Password"
//     //         type="password"
//     //         value={password}
//     //         onChange={(e) => setPassword(e.target.value)}
//     //       />

//     //       <Button
//     //         type="submit"
//     //         variant="contained"
//     //         // color="success"
//     //         style={textFieldStyle}
//     //       >
//     //         Signup
//     //       </Button>
//     //     </form>
//     //   </Paper>
//     // </Grid>
//   );
// };
import { useState } from "react";
import axios from "axios";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  CircularProgress,
} from "@mui/material";
import { useAuthContext } from "../hooks/index.js";
import { useNavigate, Link } from "react-router-dom";
export const Signup = () => {
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    firstname: "",
    lastname: "",
    password: "",
    profilepic: null,
  });
  const [profilePreview, setProfilePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formDataObject = new FormData(e.target);
    const data = {};

    for (const [key, value] of formDataObject.entries()) {
      data[key] = value;
    }
    // console.log(data, "data");

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/user/signup",
        data // Send the constructed plain object
      );
      console.log("API Response:", response.data);
      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.data));
        dispatch({ type: "LOGIN", payload: response.data });
        navigate("/auth/signin");
      }
    } catch (error) {
      // Check if the error response has specific fields
      if (error.response?.data) {
        setError(error.response.data); // Example: { email: "Email already exists" }
      } else {
        setError({ general: "An unexpected error occurred" });
      }
    }
    console.log(error, "error");

    setLoading(false);
    // Logs the object with form data
  };
  const handleBlur = async (e) => {
    // const { name, value } = e.target;
    // if (!value.trim()) return;
    try {
      const userSignUp = {
        email: formData.email,
        username: formData.username,
      };

      // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const res = await axios.post("http://127.0.0.1:8000/user/signup", {
        userSignUp,
      });
      console.log(res, "res");

      // if (name === "username") {
      //   // API call to check email availability
      //   const response = await axios.post("http://127.0.0.1:8000/user/signup", {
      //     username: value,
      //   });
      //   setError((prevErrors) => ({
      //     ...prevErrors,
      //     username: response.data.username,
      //   }));
      // }
    } catch (error) {
      if (error.res) {
        const { data } = error.res;
        setError(data);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "profilepic") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files ? files[0] : value,
      }));
      setProfilePreview(URL.createObjectURL(files[0]));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    setError((prev) => ({
      ...prev,
      [name]: "",
    }));
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
          Sign up
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                error={Boolean(error.email)}
                fullWidth
                onBlur={handleBlur}
                name="email"
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={handleChange}
                helperText={error.email}
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
                required
                error={Boolean(error.username)}
                fullWidth
                name="username"
                label="Username"
                value={formData.username}
                onBlur={handleBlur}
                onChange={handleChange}
                helperText={error.username}
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
                required
                error={Boolean(error.firstname)}
                fullWidth
                name="firstname"
                label="First Name"
                value={formData.firstname}
                onChange={handleChange}
                helperText={error.firstname}
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
                required
                error={Boolean(error.lastname)}
                fullWidth
                name="lastname"
                label="Last Name"
                value={formData.lastname}
                onChange={handleChange}
                helperText={error.lastname}
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
                required
                error={Boolean(error.password)}
                fullWidth
                name="password"
                label="Password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                helperText={error.password}
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
                required
                error={Boolean(error.profilepic)}
                fullWidth
                name="profilepic"
                label="Profile Picture"
                type="file"
                onChange={handleChange}
                helperText={error.profilepic}
                InputLabelProps={{ shrink: true }}
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
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color={error.email ? "error" : "primary"}
            // sx={{ mt: 3, mb: 2 }}
            sx={(theme) => ({
              mt: 3,
              mb: 2,
              // backgroundColor: theme.palette.primary.main,
              "&:hover": {
                backgroundColor: error.email
                  ? "red"
                  : theme.palette.primary.main,
              },
            })}
            disabled={loading}
          >
            {/* Sign Up */}
            {loading ? <CircularProgress size={24} /> : "Sign Up"}
          </Button>

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link
                to="/auth/signin"
                style={{ textDecoration: "none", color: "teal" }}
              >
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
