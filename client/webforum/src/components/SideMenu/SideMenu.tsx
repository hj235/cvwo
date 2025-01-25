import { useState } from 'react';
import { styled } from '@mui/material/styles';
import MuiDrawer, { drawerClasses } from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import useMediaQuery from '@mui/material/useMediaQuery';
import MenuContent from './MenuContent';
import { useUserContext } from '../../hooks/auth/useUserContext';
import LoggedInFooter from './LoggedInFooter';
import LoggedOutFooter from './LoggedOutFooter';

const drawerWidth = 240;

const Drawer = styled(MuiDrawer)(() => ({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: 'border-box',
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: 'border-box',
  },
}));

// SideMenu to display user status and clickable links for ease of navigation
export default function SideMenu() {
  const { userState } = useUserContext();
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerContent = (
    <>
      <Box
        sx={{
          display: 'flex',
          p: 1.5,
          alignItems: 'center',
          backgroundColor: "#f0f4ff"
        }}
      >
      </Box>
      <Divider />
      <Box
        sx={{
          overflow: 'auto',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <MenuContent />
      </Box>
      <Stack
        direction="column"
        sx={{
          p: 2,
          gap: 2,
          alignItems: 'center',
          borderTop: '1px solid',
          borderColor: 'divider',
          backgroundColor: '#f0f4ff',
        }}
      >
        {userState.isLoggedIn ? <LoggedInFooter userState={userState} /> : <LoggedOutFooter/>}
      </Stack>
    </>
  );

  return (
    <>
      {isSmallScreen && (
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleDrawerToggle}
          sx={{
            backgroundColor: mobileOpen ? "#f0f4ff" : "transparent",
            position: 'fixed',
            top: 16,
            left: mobileOpen ? `${drawerWidth + 16}px` : 16,
            transition: 'left 0.3s ease',
            zIndex: 1301,
          }}
        >
          {mobileOpen ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      )}
      <Drawer
        variant={isSmallScreen ? 'temporary' : 'permanent'}
        open={isSmallScreen ? mobileOpen : true}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: 'block' },
          [`& .${drawerClasses.paper}`]: {
            backgroundColor: 'background.paper',
          },
        }}
        ModalProps={{
          keepMounted: true,
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
}
