import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Box, IconButton, Tooltip, Modal, Typography, TextField } from "@mui/material";
import { Delete, Check, Close } from '@mui/icons-material';
import useDeleteUser from "../hooks/threads/useDeleteUser";

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

export default function DeleteUserButton() {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [password, setPassword] = useState<string>('');
    const { deleteUser, error, loading } = useDeleteUser();

    useEffect(() => {
        if (error && !loading) {
            toast.error(error);
        }
    }, [error, loading]);

    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);
    const handleDelete = () => {
        deleteUser(password);
    }

    return (
        <>
            <Modal
            open={openModal}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...modalStyle, width: 400, justifyItems: "center" }}>
                    <Typography>This action cannot be reversed. Please enter your password to confirm deletion.</Typography>
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
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Tooltip title="Confirm">
                        <IconButton sx={{ color: "lightgreen", "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                        cursor: "pointer",
                        color: "darkgreen"
                        }, }}
                        onClick={handleDelete}>
                            <Check/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Close">
                        <IconButton sx={{ color: "salmon", "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                        cursor: "pointer",
                        color: "darkred"
                        }, }}
                        onClick={handleClose}>
                            <Close/>
                        </IconButton>
                    </Tooltip>
                </Box>
            </Modal>
            <Tooltip title="Delete">
                <IconButton sx={{ color: "salmon", "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                cursor: "pointer",
                color: "darkred"
                }, }}
                onClick={handleOpen}>
                    <Delete/>
                </IconButton>
            </Tooltip>
        </>
    )
}