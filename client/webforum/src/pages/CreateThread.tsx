import React, { useState, useEffect } from "react";
import { Avatar, Button, TextField, Paper, Box, Typography, Stack, Chip } from "@mui/material"
import { toast } from "react-toastify";
import DrawIcon from '@mui/icons-material/Draw';
import { useLoggedOutRedirect } from "../hooks/auth/useLoggedOutRedirect.ts";
import useCreateThread from "../hooks/threads/useCreateThread.tsx";
import { parseTags } from "../helpers/tags.ts";
import { Tag } from "../context/ThreadsContext.tsx";
import '../layout/gradientbg.css';

export default function Login() {
    const [title, setTitle] = useState<string>("");
    const [body, setBody] = useState<string>("");
    const [tagsStr, setTagsStr] = useState<string>("");
    const [tags, setTags] = useState<Tag[]>([]);
    const [formError, setFormError] = useState({ title: "", body: "", });
    const { createThread, error, loading } = useCreateThread();
    useLoggedOutRedirect();

    useEffect(() => {
        setTags(parseTags(tagsStr));
    }, [tagsStr]);

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);

    function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
        event.preventDefault();
        const inputErrors = {
            title: title ? '' : "Title cannot be empty",
            body: body ? '' : "Body cannot be empty",
        };
        setFormError(inputErrors);

        if (inputErrors.title || inputErrors.body) {
            return;
        }

        createThread(title, body, tagsStr);
    };

    const handleChange = (setter:React.Dispatch<React.SetStateAction<string>>) => {
        return (e: React.ChangeEvent<HTMLInputElement>) => {
            setFormError({ title: "", body: "" });
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
                            <DrawIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Create Thread
                        </Typography>
                        
                        {/* Form for creating thread */}
                        <Box
                        component="form"
                        noValidate
                        onSubmit={handleSubmit}
                        sx={{ mt: 1, width: "50vw", minWidth: "400" }}
                        >
                            {/* Thread title */}
                            <TextField
                            autoFocus
                            required
                            fullWidth
                            margin="normal"
                            name="title"
                            label="Title"
                            id="title"
                            autoComplete="title"
                            value={title}
                            onChange={handleChange(setTitle)}
                            />
                            <Typography className="error-message" color="error">
                                {formError.title}
                            </Typography>

                            {/* Thread body */}
                            <TextField
                            required
                            fullWidth
                            multiline
                            rows={10}
                            margin="normal"
                            name="body"
                            label="Body"
                            id="body"
                            type="body"
                            autoComplete="body"
                            value={body}
                            onChange={handleChange(setBody)}
                            // sx={{ height: "30vh" }}
                            />
                            <Typography className="error-message" color="error">
                                {formError.body}
                            </Typography>

                            {/* Tags */}
                            {tags?.map((tag) => {
                                return (
                                    <Chip
                                    key={tag.body}
                                    label={tag.body}
                                    size="small"
                                    variant="outlined"
                                    sx={{ borderRadius: 3, mr: 1 }}
                                    />
                                );
                            })}
                            <TextField
                            required
                            fullWidth
                            margin="normal"
                            name="tags"
                            label="Tags"
                            id="tags"
                            type="tags"
                            autoComplete="tags"
                            value={tagsStr}
                            onChange={(e) => {
                                setTagsStr(e.target.value);
                            }}
                            />
                            <Typography color="grey">
                                Separate tags by using a space. 
                                <br/>
                                (etc. for tags "Tech" and "Arts", input "Tech Arts")
                            </Typography>
                            
                            {/* Submit button */}
                            <Button
                            fullWidth
                            type="submit"
                            variant="contained"
                            disabled={loading}
                            sx={{ mt: 3, mb: 2 }}
                            >
                                Create Thread
                            </Button>
                        </Box>
                    </Box>
                </Stack>
            </Stack>
        </>
    );
};
