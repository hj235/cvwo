import React, { useState, useEffect } from "react";
import { Avatar, Button, CssBaseline, TextField, Paper, Box, Grid, Typography, Link, Stack } from "@mui/material"
import { toast } from "react-toastify";
import { useLogin } from "../hooks/auth/useLogin.ts";
import LockIcon from "@mui/icons-material/Lock";
import { useLoggedInRedirect } from "../hooks/auth/useLoggedInRedirect.ts";
// import GradientBackground from "../components/GradientBackground/GradientBackground.tsx";
// import { useRandomColorGradient } from "../hooks/auth/useRandomColorGradient.jsx";
import '../layout/gradientbg.css';

const NewLogin = () => {
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
            <Stack className="gradient-bg" component="main" sx={{ alignItems: "center", justifyContent: "center", flex: "auto", flexGrow: 1 }}>
                <Stack component={Paper} elevation={12} sx={{ borderRadius: 2, alignItems: "center", justifyItems: "center", display: "flex" }} >
                    <Box
                        sx={{
                        my: 8,
                        mx: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
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
                </Stack>
            </Stack>
        </>
    );
};

export default NewLogin;
