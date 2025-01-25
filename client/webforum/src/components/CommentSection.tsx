import React, { useState, useMemo } from 'react';
import { Box, TextField, Button, Typography, List, CircularProgress, Container } from '@mui/material';
import { useCommentsContext } from '../hooks/threads/useCommentsContext';
import useGetComments from '../hooks/threads/useGetComment';
import { initialComment } from '../context/CommentsContext';
import useCreateComment from '../hooks/threads/useCreateComment';
import { toast } from 'react-toastify';
import CommentCard from "./CommentCard";

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

        return comment ? (
          <CommentCard comment={comment} />
      ) : <></>})}
    </List>
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
        {commentsState.comments && <>
          <Typography>{`${commentsState.comments.length} Comments`}</Typography>
          {commentsList}
        </>}
    </>
  );
}