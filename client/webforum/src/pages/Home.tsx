import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  OutlinedInput,
  Stack,
  Divider,
} from "@mui/material";
import ThreadModal from "../components/ThreadModal";
import ThreadList from "../components/ThreadList";
import { Thread, initialThread } from "../context/ThreadsContext";
import useGetThreads from "../hooks/threads/useGetThreads";
import { useThreadsContext } from "../hooks/threads/useThreadsContext";
import { useUserContext } from "../hooks/auth/useUserContext";

export default function Home() {
    const { threadsState } = useThreadsContext();
    const [filteredThreads, setFilteredThreads] = useState<Thread[]>(threadsState.threads);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [sortBy, setSortBy] = useState("recent");
    const [selectedThread, setSelectedThread] = useState<Thread>(initialThread);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const { userState } = useUserContext();
    useGetThreads();

    useEffect(() => {
        setFilteredThreads(threadsState.threads?.filter((thread) => {
            return thread.author.String == userState.username;
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
    }

  return (
    <Container maxWidth="lg" sx={{ alignItems: "center", justifyContent: "center", flex: 1, flexGrow: 1, height: "100%"}}>
      <Typography variant="h2" component="h1" gutterBottom sx={{ py: "2vh"}} >
        Homepage
      </Typography>

      <Box>
        <Stack spacing={3} mb={4}>
          <Divider/>
          <Typography variant="h4">My Threads</Typography>
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
              </Select>
            </FormControl>
          </Box>
        </Stack>

        <ThreadList filteredThreads={filteredThreads} setSelectedThread={setSelectedThread} setOpenModal={setOpenModal} />
        <ThreadModal thread={selectedThread} open={openModal} onClose={() => {setOpenModal(false)}} />
      </Box>
    </Container>
  );
};
