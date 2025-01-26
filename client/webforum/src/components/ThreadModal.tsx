import { MouseEventHandler } from "react";
import {
  Modal,
  Box,
  Typography,
  Chip,
  Paper,
  Divider
} from "@mui/material";
import { styled } from "@mui/system";
import { format } from "date-fns";
import { Thread } from "../context/ThreadsContext";
import CommentSection from "./CommentSection";
import { useCommentsContext } from "../hooks/threads/useCommentsContext";
import { useUserContext } from "../hooks/auth/useUserContext";
import useDeleteThread from "../hooks/threads/useDeleteThread";
import StringAvatar from "./StringAvatar";
import { parseTags } from "../helpers/tags";
import DeleteButton from "./DeleteButton";
import CloseButton from "./CloseButton";

type ThreadModalProps = {
  open: boolean,
  onClose: MouseEventHandler<HTMLButtonElement>,
  thread: Thread,
};

const StyledModal = styled(Modal)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
}));

const ModalContent = styled(Paper)(({ theme }) => ({
  position: "relative",
  width: "90%",
  maxWidth: 900,
  maxHeight: "90vh",
  overflow: "auto",
  padding: theme.spacing(4),
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    height: "100%",
    maxHeight: "100vh"
  }
}));

const ThreadHeader = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3)
}));

const MetadataContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
  marginTop: theme.spacing(1)
}));

const AuthorSection = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  marginTop: theme.spacing(2)
}));

const ThreadModal = ({
  open,
  onClose,
  thread,
}: ThreadModalProps) => {

  const { commentsState } = useCommentsContext();
    const { deleteThread, error, loading } = useDeleteThread();
    const { userState } = useUserContext();

    const handleDelete = () => {
      deleteThread(thread);
    }

  return (
    <StyledModal
      open={open}
      aria-labelledby="forum-thread-modal"
      aria-describedby="forum-thread-discussion"
      onClose={onClose}
    >
      <ModalContent>
        <Box sx={{ position: "absolute", right: 8, top: 8 }} >
          {userState.username == thread.author.String && <DeleteButton handleDelete={handleDelete} error={error} loading={loading} />}
          <CloseButton onClose={onClose}/>
        </Box>
        
        <ThreadHeader>
          <Typography variant="h4" component="h1" gutterBottom>
            {thread?.title}
          </Typography>

          <MetadataContainer>
            <Typography variant="body2" color="text.secondary">
              {thread.time_created && format(new Date(thread.time_created), "PPp")}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {commentsState.comments?.length} comments
            </Typography>
            <Divider/>
          </MetadataContainer>
          {thread.tags.length > 0 && parseTags(thread.tags.toString()).map((tag) => (
                <Chip
                key={tag.body}
                label={tag.body}
                size="small"
                onClick={() => {}}
                sx={{ margin: 0.5 }}
                />
          ))}

          <AuthorSection>
            <StringAvatar name={thread.author.String} />
            <Typography variant="subtitle1">{thread.author.String}</Typography>
          </AuthorSection>

          <Typography variant="body1" sx={{ mt: 3 }}>
            {thread.body}
          </Typography>
        </ThreadHeader>

        <CommentSection threadId={thread.id} />
      </ModalContent>
    </StyledModal>
  );
};

export default ThreadModal;