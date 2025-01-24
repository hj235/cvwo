import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Grid,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  OutlinedInput,
  Stack,
} from "@mui/material";
import ThreadCard from "../components/SideMenu/ThreadCard";

import useGetThreads from "../hooks/threads/useGetThreads";
import { useThreadsContext } from "../hooks/threads/useThreadsContext";
import { Thread } from "../context/ThreadsContext";

const Threads = () => {
    const { threadsState } = useThreadsContext();
    const [filteredThreads, setFilteredThreads] = useState(threadsState.threads);
    const [searchQuery, setSearchQuery] = useState("");
    //   const [selectedTags, setSelectedTags] = useState([]);
    const [sortBy, setSortBy] = useState("recent");
    useGetThreads();

    useEffect(() => {
        setFilteredThreads(threadsState.threads.filter((thread) => {
            const matchesSearch = thread.title.toLowerCase().includes(searchQuery.toLowerCase());
            // const matchesTags = selectedTags.length === 0 ||
            //     selectedTags.every((tag) => thread.tags.includes(tag));
            return matchesSearch;
        })
        .sort(dateComparator as CompareFn));
    }, [searchQuery, threadsState]);

    type CompareFn = ((a: Thread, b: Thread) => number);

    const dateComparator = (a: Thread, b: Thread) => {
        if (sortBy === "recent") {
            const dateA = new Date(a.time_created);
            const dateB = new Date(b.time_created);
            if (dateB < dateA) {
                return 1;
            } else if (dateA < dateB) {
                return -1;
            }
        }
        
        return 0;
    // return b.commentsCount - a.commentsCount;
    }

//   useEffect(() => {
//     // Mock data
//     const mockThreads = [
//       {
//         id: 1,
//         title: "Getting Started with React and Material UI",
//         content: "Hello everyone! I'm new to React and Material UI. Can someone guide me through the basics of setting up a new project?",
//         author: {
//           name: "John Doe",
//           avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7",
//         },
//         tags: ["react", "material-ui", "beginners"],
//         commentsCount: 15,
//         createdAt: "2024-01-15T10:00:00Z",
//       },
//       {
//         id: 2,
//         title: "Best Practices for State Management",
//         content: "What are your thoughts on different state management solutions? Redux vs Context API vs Zustand?",
//         author: {
//           name: "Jane Smith",
//           avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
//         },
//         tags: ["state-management", "redux", "context-api"],
//         commentsCount: 32,
//         createdAt: "2024-01-14T15:30:00Z",
//       },
//     ];
//     setThreads(mockThreads);
//   }, []);

//   const filteredThreads = threads
//     .filter((thread) => {
//       const matchesSearch = thread.title
//         .toLowerCase()
//         .includes(searchQuery.toLowerCase());
//       const matchesTags =
//         selectedTags.length === 0 ||
//         selectedTags.every((tag) => thread.tags.includes(tag));
//       return matchesSearch && matchesTags;
//     })
//     .sort((a, b) => {
//       if (sortBy === "recent") {
//         return new Date(b.createdAt) - new Date(a.createdAt);
//       }
//       return b.commentsCount - a.commentsCount;
//     });

//   const allTags = [...new Set(threads.flatMap((thread) => thread.tags))];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Community Discussions
      </Typography>

      <Stack spacing={3} mb={4}>
        <TextField
          fullWidth
          placeholder="Search threads by title, tags, or content"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <Box sx={{ display: "flex", gap: 2 }}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Sort By</InputLabel>
            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              input={<OutlinedInput label="Sort By" />}
            >
              <MenuItem value="recent">Most Recent</MenuItem>
              <MenuItem value="comments">Most Commented</MenuItem>
            </Select>
          </FormControl>

          {/* <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Filter by Tags</InputLabel>
            <Select
              multiple
              value={selectedTags}
              onChange={(e) => setSelectedTags(e.target.value)}
              input={<OutlinedInput label="Filter by Tags" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} size="small" />
                  ))}
                </Box>
              )}
            >
              {allTags.map((tag) => (
                <MenuItem key={tag} value={tag}>
                  {tag}
                </MenuItem>
              ))}
            </Select>
          </FormControl> */}
        </Box>
      </Stack>

      <Grid container spacing={3}>
        {filteredThreads.length > 0 ? (
          filteredThreads.map((thread) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={thread.id}
              sx={{ display: "flex" }}
            >
              <ThreadCard thread={thread} />
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
    </Container>
  );
};

export default Threads;
