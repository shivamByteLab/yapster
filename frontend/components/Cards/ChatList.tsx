import ChatCard from "./ChatCard";
import { ScrollArea } from "../ui/scroll-area";
import SortChatItemsByLatestActivity from "@/helper/SortChatItemsByLatestActivity";
import useChats from "@/store/useChats";

const ChatList = () => {
  const { chats: Chats } = useChats();

  if (Chats?.length === 0 || !Chats) {
    return <span className="loading loading-dots loading-lg"></span>;
  }

  const SortChatItems = SortChatItemsByLatestActivity(Chats);

  return (
    <ScrollArea>
      <div className="w-full mx-auto grid gap-4 mt-6  rounded-lg">
        {SortChatItems.map((chat: any, index: number) => (
          <ChatCard key={chat.id} user={chat} />
        ))}
      </div>
    </ScrollArea>
  );
};

export default ChatList;
