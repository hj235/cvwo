import React, { useState, useEffect } from "react";
import { Avatar, Button, TextField, Paper, Box, Typography, Stack } from "@mui/material"
import { toast } from "react-toastify";
import { useSignup } from "../hooks/auth/useSignup.ts";
import LockIcon from "@mui/icons-material/Lock";
import { useLoggedInRedirect } from "../hooks/auth/useLoggedInRedirect.ts";
import '../layout/gradientbg.css';

const Signup = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [cfmPassword, setCfmPassword] = useState("");
    const [formError, setFormError] = useState({ username: "", password: "", cfmPassword: "" });
    const { signup, loading, error } = useSignup();
    useLoggedInRedirect();

    useEffect(() => {
        if (error != '') toast.error(error)
    }, [error])

    async function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
        event.preventDefault();
        const inputErrors = {
            username: username ? '' : "Username cannot be empty",
            password: password ? '' : "Password cannot be empty",
            cfmPassword: passwordsMatch(password, cfmPassword) ? '' : "Password does not match",
        };
        setFormError(inputErrors);

        if (inputErrors.username || inputErrors.password || inputErrors.cfmPassword) {
            return;
        }

        await signup(username, password);
    };

    function passwordsMatch(password: string, cfmPassword: string) {
        return password != '' && password == cfmPassword;
    }

    const handleChange = (setter:React.Dispatch<React.SetStateAction<string>>) => {
        return (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormError({ username: '', password: '', cfmPassword: '' });
        setter((e.target as HTMLInputElement).value);
        };
    };

    return (
        <>
            <Stack className="gradient-bg" component="main" sx={{ alignItems: "center", justifyContent: "center", flex: 1, flexGrow: 1, height: "100%" }}>
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
                        Sign up
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
                        <TextField
                            required
                            fullWidth
                            margin="normal"
                            name="cfmPassword"
                            label="Confirm Password"
                            id="cfmPassword"
                            type="password"
                            autoComplete="confirm password"
                            value={cfmPassword}
                            onChange={handleChange(setCfmPassword)}
                        />
                        <Typography className="error-message" color="error">
                            {formError.cfmPassword}
                        </Typography>
                        <Button
                            fullWidth
                            type="submit"
                            variant="contained"
                            disabled={loading}
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        </Box>
                    </Box>
                </Stack>
            </Stack>
        </>
    );
};

export default Signup;
