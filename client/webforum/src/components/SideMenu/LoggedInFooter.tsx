import { Stack, Box, Typography } from "@mui/material"
import StringAvatar from "../StringAvatar"
import { UserState } from "../../context/UserContext";
import LogoutButton from "./LogoutButton";
import DeleteUserButton from "../DeleteUserButton";

type LoginSectionProps = {
    userState: UserState
};

export default function LoggedInFooter({ userState }: LoginSectionProps) {
  return (
    <>
      <Stack direction="row" sx={{ gap: 1, alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
        {userState.isLoggedIn && (
          <>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1 }}>
              <StringAvatar name={userState.username} />
              <Box sx={{ mr: 'auto' }}>
                <Typography variant="body2" sx={{ fontWeight: 500, lineHeight: '16px' }}>
                  {userState.username}
                </Typography>
              </Box>
            </Box>
            <DeleteUserButton />
          </>
        )}
      </Stack>
      <LogoutButton/>
    </>
  )
}