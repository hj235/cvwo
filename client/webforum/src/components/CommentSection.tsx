import React, { useState, useMemo } from 'react';
import { Box, TextField, Button, Typography, List, ListItem, ListItemAvatar, ListItemText, IconButton, CircularProgress } from '@mui/material';
import { format } from "date-fns";
import { useCommentsContext } from '../hooks/threads/useCommentsContext';
import useGetComments from '../hooks/threads/useGetComment';
import { initialComment } from '../context/CommentsContext';
import StringAvatar from './StringAvatar';
import useCreateComment from '../hooks/threads/useCreateComment';

type CommentSectionProps = {
    threadId: string,
}

export default function CommentSection({ threadId }: CommentSectionProps) {
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { commentsState } = useCommentsContext();
  useGetComments(threadId);

  const commentsList = useMemo(() => (
    <List>
      {commentsState.comments?.map((comment) => (
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
                    ?`edited :${format(new Date(comment.time_edited.String), "PPp")}`
                    : format(new Date(comment.time_created), "PPp")}
                </Typography>
              </Box>
            }
            secondary={
              <Box mt={1}>
                <Typography variant="body1" color="text.primary">
                  {comment.body}
                </Typography>
                {/* <IconButton
                  size="small"
                  onClick={() => toggleLike(comment.id)}
                  aria-label={likedComments.has(comment.id) ? "Unlike" : "Like"}
                >
                  {likedComments.has(comment.id) ? <FaHeart color="#f44336" /> : <FaRegHeart />}
                </IconButton> */}
              </Box>
            }
          />
        </ListItem>
      ))}
    </List>
  //   ), [comments, likedComments, toggleLike]);
  ), [commentsState.comments]);

  const handleComment = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    // const inputErrors = {
    // username: username ? '' : "Username cannot be empty",
    // password: password ? '' : "Password cannot be empty"
    // };
    // setFormError(inputErrors);

    // if (inputErrors.username || inputErrors.password) {
    // return;
    // }

    // await login(username, password);
    setIsSubmitting(true);
    useCreateComment({ ...initialComment, thread_id: threadId, body: newComment })
  };
  
  return (
    <>
      <Box>
        <Typography variant="h6" gutterBottom>
            Comments
        </Typography>
        <Box sx={{ mt: 3 }}>
          <TextField
              fullWidth
              multiline
              rows={3}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              variant="outlined"
              disabled={isSubmitting}
              inputProps={{ maxLength: 1000 }}
              helperText={`${newComment.length}/1000 characters`}
          />
          <Box sx={{ mt: 1, display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              onClick={handleComment}
              disabled={!newComment.trim() || isSubmitting}
              startIcon={isSubmitting && <CircularProgress size={20} />}
              >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </Box>
          {commentsList}
        </Box>
      </Box>
    </>
  );
}