import { useState, useContext } from "react";
import { Grid, Paper, TextField, Button, Alert } from "@mui/material";
import { CurrentUserAuthContext } from "../context/curentUserAuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
  const { dispatch } = useContext(CurrentUserAuthContext);
  const [error, setError] = useState({});
  const navigate = useNavigate();

  async function getUser(e) {
    e.preventDefault();

    try {
      const userLogin = {
        email: email,
        password: password,
      };

      const response = await axios.post(
        "http://127.0.0.1:8000/login",
        userLogin,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Assuming the response contains a token
      if (response.data && response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        // Update auth context
        dispatch({ type: "LOGIN", payload: response.data.user });

        // Navigate to home page
        navigate("/");
      } else {
        throw new Error("Invalid server response. Token not found.");
      }
    } catch (error) {
      console.error("Login error:", error);

      if (error.response) {
        const { data } = error.response;
        setError(data);
      }
    }
  }

  function emailHandler(e) {
    let item = e.target.value;
    setEmail(item);
    setError({});
  }

  return (
    <Grid>
      <Paper style={paperStyle}>
        <Grid align="center">
          <h2 style={headerStyle}> Login</h2>
        </Grid>
        {error.message && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error.message}
          </Alert>
        )}
        <form onSubmit={getUser} className="loginform">
          <TextField
            required
            error={Boolean(error.message)}
            color={error.message ? "error" : "primary"}
            // helperText={error.message}
            style={textFieldStyle}
            label="Email"
            fullWidth
            value={email}
            type="text"
            onChange={emailHandler}
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

          <TextField
            required
            error={Boolean(error.message)}
            style={textFieldStyle}
            fullWidth
            label="Password"
            type="password"
            value={password}
            color={error.message ? "error" : "primary"}
            // helperText={error.message}
            onChange={(e) => setPassword(e.target.value)}
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

          <Button
            type="submit"
            variant="contained"
            color={error.message ? "error" : "primary"}
            style={textFieldStyle}
            sx={(theme) => ({
              "&:hover": {
                backgroundColor: error.message
                  ? "red"
                  : theme.palette.primary.main,
              },
            })}
          >
            Login
          </Button>
        </form>
      </Paper>
    </Grid>
  );
};
