import { Card, CardHeader, Typography, CardContent, Chip } from '@mui/material';
import { styled } from '@mui/system';
import { Thread } from '../context/ThreadsContext';
import StringAvatar from './StringAvatar';
import { format } from 'date-fns';
import { parseTags } from '../helpers/tags';
import useDeleteThread from '../hooks/threads/useDeleteThread';
import DeleteButton from './DeleteButton';
import { useUserContext } from '../hooks/auth/useUserContext';
import { stringToColor } from './StringAvatar';

type ThreadCardProps = {
    thread: Thread,
    select: React.MouseEventHandler<HTMLDivElement>,
}

const StyledCard = styled(Card)(() => ({
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
      cursor: "pointer",
    },
}));

const ThreadCard: React.FC<ThreadCardProps> = ({ thread, select }: ThreadCardProps) => {
    const { deleteThread, error, loading } = useDeleteThread();
    const { userState } = useUserContext();

    const handleDelete = () => {
        deleteThread(thread);
    }

    return (
        <StyledCard onClick={select} >
            <CardHeader
                avatar={<StringAvatar name={thread.author.String} />}
                title={thread.author.String}
                subheader={format(new Date(thread.time_created), "MMM dd, yyyy")}
                action={
                    (thread.author.String == userState.username) && <DeleteButton handleDelete={handleDelete} error={error} loading={loading} />
                }
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
                {parseTags(thread.tags.toString()).map((tag) => (
                    <Chip
                    key={tag.body}
                    label={tag.body}
                    size="small"
                    onClick={() => {}}
                    sx={{ margin: 0.5, backgroundColor: stringToColor(tag.body) }}
                    />
                ))}
            </CardContent>
        </StyledCard>
    );
}

export default ThreadCard;