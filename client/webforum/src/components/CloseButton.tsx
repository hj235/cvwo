import { MouseEventHandler } from "react";
import { IconButton, Tooltip } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

interface CloseButtonProps {
    onClose: MouseEventHandler<HTMLButtonElement> | undefined,
}

export default function CloseButton({onClose}: CloseButtonProps) {
    return (
        <Tooltip title="Close">
            <IconButton
                onClick={onClose}
                aria-label="close modal"
            >
                <CloseIcon/>
            </IconButton>
        </Tooltip>
    )
}