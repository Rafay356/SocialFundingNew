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
import { useAuthContext } from "../hooks/index.jsx";
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
                inputProps={{ accept: "image/*" }}
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
