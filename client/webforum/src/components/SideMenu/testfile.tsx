// Dependencies
import { styled } from '@mui/material/styles';
import MuiDrawer, { drawerClasses } from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// Local components
import MenuContent from './MenuContent';
import LogoutButton from './LogoutButton';
import StringAvatar from '../StringAvatar';
// Hooks
import { useUserContext } from '../../hooks/auth/useUserContext';


const drawerWidth = 240;

const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: 'border-box',
  mt: 10,
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: 'border-box',
  },
});

export default function SideMenu() {
  const { userState } = useUserContext();

  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: 'none', md: 'block' },
        [`& .${drawerClasses.paper}`]: {
          backgroundColor: 'background.paper',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          mt: 'calc(var(--template-frame-height, 0px) + 4px)',
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
        <Stack direction="row" sx={{ gap: 1, alignItems: 'center', width: '100%' }}>
          {userState.isLoggedIn && <>
          <StringAvatar name={userState.username} />
          <Box sx={{ mr: 'auto' }}>
            <Typography variant="body2" sx={{ fontWeight: 500, lineHeight: '16px' }}>
              {userState.username}
            </Typography>
          </Box></>}
        </Stack>
        {userState.isLoggedIn && <LogoutButton/>}
      </Stack>
    </Drawer>
  );
}