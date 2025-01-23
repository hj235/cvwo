import React, { useState, useEffect } from "react";
import { Avatar, Button, CssBaseline, TextField, Paper, Box, Grid, Typography, Link } from "@mui/material"
import { toast } from "react-toastify";
import { useLogin } from "../hooks/auth/useLogin.jsx";
import LockIcon from "@mui/icons-material/Lock";
import { useLoggedInRedirect } from "../hooks/auth/useLoggedInRedirect.js";
// import { useRandomColorGradient } from "../hooks/auth/useRandomColorGradient.jsx";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState({ username: "", password: "" });
  const { login, loading, error } = useLogin();
  useLoggedInRedirect();
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
                    Don't have an account?
                  </Typography>
                  <Typography >
                    <Link href="/signup" style={{ textDecorationColor: 'grey', color: 'grey' }} underline='always' >Register here</Link>
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
