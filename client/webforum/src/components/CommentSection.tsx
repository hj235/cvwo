import React, { useState, useMemo } from 'react';
import { Box, TextField, Button, Typography, List, ListItem, ListItemAvatar, ListItemText, IconButton, CircularProgress, Container } from '@mui/material';
import { format } from "date-fns";
import { useCommentsContext } from '../hooks/threads/useCommentsContext';
import useGetComments from '../hooks/threads/useGetComment';
import { initialComment } from '../context/CommentsContext';
import StringAvatar from './StringAvatar';
import useCreateComment from '../hooks/threads/useCreateComment';
import { toast } from 'react-toastify';

type CommentSectionProps = {
    threadId: string,
}

export default function CommentSection({ threadId }: CommentSectionProps) {
  const [newComment, setNewComment] = useState("");
  const { commentsState } = useCommentsContext();
  const { createComment, error, loading } = useCreateComment();
  useGetComments(threadId);

  const notifyError = (err: string) => toast.error(err);

  const commentsList = useMemo(() => (
    <List>
      {commentsState.comments?.map((comment) => {
        // console.log("created", comment.time_created, "edited", comment.time_edited)

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
                <Typography variant="body1" color="text.primary">
                  {comment.body}
                </Typography>
                // {/* <IconButton
                //   size="small"
                //   onClick={() => toggleLike(comment.id)}
                //   aria-label={likedComments.has(comment.id) ? "Unlike" : "Like"}
                // >
                //   {likedComments.has(comment.id) ? <FaHeart color="#f44336" /> : <FaRegHeart />}
                // </IconButton> */}
            }
          />
        </ListItem>
      )})}
    </List>
  //   ), [comments, likedComments, toggleLike]);
  ), [commentsState]);

  const handleComment = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    createComment({ ...initialComment, thread_id: threadId, body: newComment });
    if (error) {
      notifyError(error)
    } else {
      setNewComment('');
    };
  };
  
  return (
    <>
      <Box>
        <Typography variant="h6" gutterBottom>
            Comment Section
        </Typography>
          <Container sx={{ mt: 1, display: "flex", flexDirection: "row" }} >
            <TextField
                fullWidth
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                variant="outlined"
                disabled={loading}
                inputProps={{ maxLength: 1000 }}
                helperText={`${newComment.length}/1000 characters`}
            />
            <Button
              variant="contained"
              onClick={handleComment}
              disabled={!newComment.trim() || loading}
              startIcon={loading && <CircularProgress size={20} />}
              sx={{ height: 57, ml: 1 }}
              >
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </Container>
        </Box>
        <Typography>{`${commentsState.comments.length} Comments`}</Typography>
        {commentsList}
    </>
  );
}