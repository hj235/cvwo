import { Stack, Box, Typography } from "@mui/material"
import StringAvatar from "./StringAvatar"
import { UserState } from "../../context/UserContext";
import LogoutButton from "./LogoutButton";

type LoginSectionProps = {
    userState: UserState
  };

export default function LoggedInFooter({ userState }: LoginSectionProps) {

    return (
      <>
        <Stack direction="row" sx={{ gap: 1, alignItems: 'center', width: '100%' }}>
          {userState.isLoggedIn && (
            <>
              <StringAvatar name={userState.username} />
              <Box sx={{ mr: 'auto' }}>
                <Typography variant="body2" sx={{ fontWeight: 500, lineHeight: '16px' }}>
                  {userState.username}
                </Typography>
              </Box>
            </>
          )}
        </Stack>
        <LogoutButton/>
      </>
    )
}