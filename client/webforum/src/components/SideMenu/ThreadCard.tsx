import { Card, CardHeader, Typography, CardContent, Stack, Chip, Box } from '@mui/material';
import { styled } from '@mui/system';
import { Thread } from '../../context/ThreadsContext';
import StringAvatar from '../StringAvatar';
import { format } from 'date-fns';

type ThreadCardProps = {
    thread: Thread,
}

const StyledCard = styled(Card)(({ theme }) => ({
    height: "100%",
    display: "flex",
    flexDirection: "column",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
      cursor: "pointer",
    },
}));

const ThreadCard: React.FC<ThreadCardProps> = ({ thread }: ThreadCardProps) => {
    return (
        <StyledCard>
            <CardHeader
                avatar={<StringAvatar name={thread.author.String} />}
                title={thread.author.String}
                subheader={format(new Date(thread.time_created), "MMM dd, yyyy")}
            />
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom noWrap>
                {thread.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                {thread.body.length > 150
                    ? `${thread.body.substring(0, 150)}...`
                    : thread.body}
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" mb={2}>
                {/* {thread.tags.map((tag) => (
                    <Chip
                    key={tag}
                    label={tag}
                    size="small"
                    onClick={() => {}}
                    sx={{ margin: 0.5 }}
                    />
                ))} */}
                </Stack>
                {/* <Box
                sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    gap: 1,
                }}
                >
                <QuestionAnswerIcon />
                <Typography variant="body2">{thread.commentsCount}</Typography>
                </Box> */}
            </CardContent>
        </StyledCard>
    );
}

export default ThreadCard;