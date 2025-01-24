import { useThreadsContext } from './useThreadsContext.js';
import { Thread } from '../../context/ThreadsContext.js';

export default function useGetThread(id: string): Thread {
    const { threadsState } = useThreadsContext();
    const filteredThreads = threadsState.threads.filter((thread) => {thread.id == id});

    return filteredThreads[0];
}