import { ChatType } from "@/types/ChatType";

const SortChatItemsByLatestActivity = (data: ChatType[]) => {
  // Sort the array based on `latestMessage.createdAt`, falling back to `updatedAt`
  const sortedChatItems = data.sort((a, b) => {
    const dateA = a.latestMessage?.createdAt
      ? new Date(a.latestMessage.createdAt).getTime()
      : new Date(a.updatedAt).getTime();
    const dateB = b.latestMessage?.createdAt
      ? new Date(b.latestMessage.createdAt).getTime()
      : new Date(b.updatedAt).getTime();
    return dateB - dateA; // Most recent activity first
  });

  return sortedChatItems;
};

export default SortChatItemsByLatestActivity;
