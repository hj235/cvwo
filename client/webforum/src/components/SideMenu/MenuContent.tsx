import { Link, useLocation } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import HomeIcon from '@mui/icons-material/Home';
import GestureIcon from '@mui/icons-material/Gesture';
import DrawIcon from '@mui/icons-material/Draw';

import { useUserContext } from '../../hooks/auth/useUserContext'

const publicItems = [
    { text: 'Threads', icon: <GestureIcon />, path: '/' },
];

const privateItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/home' },
    { text: 'Create New Thread', icon: <DrawIcon />, path: '/create' },
];

// Component for the clickable links in the sidemenu
export default function MenuContent() {
    const location = useLocation();
    const { userState } = useUserContext();

    // Amazing Arrowhead code design!!!!!
    return (
        <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
            <List dense>
                {publicItems.map(item => (
                    <Link key={item.text} to={item.path} style={{color: 'grey'}}>
                        <ListItem disablePadding sx={{ display: 'block' }}>
                            <ListItemButton selected={item.path==location.pathname}>
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                ))}
            </List>
            {userState.isLoggedIn && <List dense>
                {privateItems.map(item => (
                <Link key={item.text} to={item.path} style={{color: 'grey'}}>
                    <ListItem disablePadding sx={{ display: 'block' }}>
                        <ListItemButton selected={item.path==location.pathname}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                </Link>
                ))}
            </List>}
        </Stack>
    );
}
