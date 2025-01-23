import { Button, Box, Typography } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from 'react-router-dom';

export default function LoggedOutFooter() {
    const navigate = useNavigate();
    
    return (
        <Box>
            <Typography>
                You're currently logged out. Log in to access more features!
            </Typography>
            <Button
                variant="contained"
                fullWidth
                onClick={() => navigate('/login')}
                sx={{ mt: 1, backgroundColor: "primary.main" }}
                >
                Login <LoginIcon sx={{ml: 1}}/>
            </Button>
        </Box>
    );
}