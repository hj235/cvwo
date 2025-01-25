import { Box, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import StringAvatar from "./StringAvatar";
import DeleteButton from "./DeleteButton";
import { format } from "date-fns";
import { Comment } from "../context/CommentsContext";
import useDeleteComment from "../hooks/threads/useDeleteComment";
import { useUserContext } from "../hooks/auth/useUserContext";
import useGetComments from "../hooks/threads/useGetComment";

interface CommentCardProps {
    comment: Comment,
}

export default function CommentCard({ comment }:CommentCardProps) {
    const { deleteComment, error, loading } = useDeleteComment();
    const { userState } = useUserContext();

    const handleDelete = () => {
        deleteComment(comment);
        useGetComments(comment.thread_id);
    };

    return (
        <ListItem
          key={comment.id}
          alignItems="flex-start"
          sx={{ borderBottom: 1, borderColor: "divider" }}
        >
          <ListItemAvatar>
            <StringAvatar name={comment.author.String} />
          </ListItemAvatar>
          <ListItemText
            primary={
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="subtitle1" component="span">
                  {comment.author.String}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {comment.time_edited.Valid
                    ?`edited :${format(new Date(comment.time_edited.String), "MMM dd, yyyy")}`
                    : format(new Date(comment.time_created), "MMM dd, yyyy")}
                </Typography>
              </Box>
            }
            secondary={
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="body1" color="text.primary">
                  {comment.body}
                </Typography>
                {(userState.username == comment.author.String) &&<DeleteButton handleDelete={handleDelete} error={error} loading={loading} />}
              </Box>
            }
          />
        </ListItem>
    )
}