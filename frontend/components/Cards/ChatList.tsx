import ChatCard from "./ChatCard";
import { ScrollArea } from "../ui/scroll-area";
import useUserInteractions from "@/hooks/useUserInteractions";
import SortChatItemsByLatestActivity from "@/helper/SortChatItemsByLatestActivity"
import useChats from "@/store/useChats";

const ChatList = () => {
  // const { Loading, Chats } = ;
  const {chats:Chats} = useChats()
  
  // if (Loading) {
  //   return <span className="loading loading-dots loading-lg"></span>;
  // }

  if (!Chats) {
    return <p>No interactions found.</p>;
  }

  const SortChatItems = SortChatItemsByLatestActivity(Chats)

// console.log(Chats)

  return (
    <ScrollArea>
      <div className="w-full mx-auto grid gap-4 mt-6 text-white rounded-lg">
        {SortChatItems.map((chat:any, index: number) => (
          <ChatCard
            key={chat.id}
            user={chat}
          />
        ))}
      </div>
    </ScrollArea>
  );
};

export default ChatList;
