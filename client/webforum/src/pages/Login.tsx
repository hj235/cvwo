import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { ToastContainer, toast } from "react-toastify";
import { useLogin } from "../hooks/auth/useLogin.jsx";
import LockIcon from "@mui/icons-material/Lock";
// import { useRandomColorGradient } from "../hooks/auth/useRandomColorGradient.jsx";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [formError, setFormError] = useState({ username: "", password: "" });
  const { login, loading, error } = useLogin();
  // const { color, direction } = useRandomColorGradient();

  useEffect(() => {
    if (error != '') toast.error(error)
  }, [error])

  async function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    const inputErrors = {
      username: username ? '' : "Username cannot be empty",
      password: password ? '' : "Password cannot be empty"
    };
    setFormError(inputErrors);

    if (inputErrors.username || inputErrors.password) {
      return;
    }

    await login(username, password);
  };

  const handleChange = (setter:React.Dispatch<React.SetStateAction<string>>) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormError({ username: "", password: "" });
      setter((e.target as HTMLInputElement).value);
    };
  };

  return (
    <>
      <ToastContainer/>
      {/* {error && <CustomAlert message={error} />} */}
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            // backgroundImage: `linear-gradient(${direction}, #61F4DE, ${color})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                autoFocus
                required
                fullWidth
                margin="normal"
                name="username"
                label="Username"
                id="username"
                autoComplete="username"
                value={username}
                onChange={handleChange(setUsername)}
              />
              <Typography className="error-message" color="error">
                {formError.username}
              </Typography>
              <TextField
                required
                fullWidth
                margin="normal"
                name="password"
                label="Password"
                id="password"
                type="password"
                autoComplete="password"
                value={password}
                onChange={handleChange(setPassword)}
              />
              <Typography className="error-message" color="error">
                {formError.password}
              </Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    value="remember"
                    color="primary"
                    onChange={() => setIsAdmin(!isAdmin)}
                  />
                }
                label="Admin Login"
              />
              <Button
                fullWidth
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Typography variant="body2">
                    Forgot password? Don't have an account? Contact an Admin!
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
