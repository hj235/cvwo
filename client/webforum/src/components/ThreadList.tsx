import { Grid, Typography } from '@mui/material';
import ThreadCard from './ThreadCard';
import { Thread } from '../context/ThreadsContext';
import React from 'react';

interface ThreadListProps {
    filteredThreads: Thread[],
    setSelectedThread: (value: React.SetStateAction<Thread>) => void,
    setOpenModal: (value: React.SetStateAction<boolean>) => void,
};

export default function ThreadList({ filteredThreads, setSelectedThread, setOpenModal }: ThreadListProps) {
    return (
        <Grid container spacing={3}>
        {filteredThreads?.length > 0 ? (
          filteredThreads.map((thread) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={thread.id}
              sx={{ display: "flex" }}
            >
              <ThreadCard thread={thread} select={() => {
                setSelectedThread(thread);
                setOpenModal(true);
              }} />
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="h6" textAlign="center">
              No threads found. Try adjusting your filters.
            </Typography>
          </Grid>
        )}
      </Grid>
    )
}