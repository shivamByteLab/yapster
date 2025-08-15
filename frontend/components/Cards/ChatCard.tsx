import { useAuthContext } from "@/context/useAuthContext";
import { useHide } from "@/context/useHideProvider";
import { extractTime } from "@/helper/extractTime";
import useConversation from "@/store/useConversation";
import { Check, CheckCheck } from "lucide-react";
import { ChatType } from "@/types/ChatType";

const ChatCard = ({ user }: { user: ChatType }) => {
  const { setIsHidden } = useHide();
  const { authUser } = useAuthContext();
  const { selectedConversation, setSelectedConversation, messages } = useConversation();

  const isGroup = user.type === "group";

  // Check if the current user is the logged-in user
  const isFromMe = user.latestMessage?.senderId === authUser?.user?.id;

  // Check if this card's user is the selected conversation
  const selectedUser = user.id === selectedConversation?.id;

  const handleClick = () => {
    setSelectedConversation(user);
    setIsHidden(true);
  };

  return (
    <div
      onClick={handleClick}
      className={`flex items-center w-full gap-2 p-3 border-b-[0.5px] ${
        selectedUser && "bg-[#3d3d3d]"
      } border-gray-600 hover:bg-[#3d3d3d] cursor-pointer`}
    >
      {/* Profile Picture or Group Icon */}
      <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-700">
        {user.avatar ? (
          <img src={user.avatar} alt={`${user.name}'s profile`} />
        ) : (
          <div className="flex items-center justify-center w-full h-full  font-bold">
            {user.type === "group" && user.name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>

      {/* Chat Details */}
      <div className="flex-1 ml-3">
        <div className="flex justify-between">
          <p className="font-semibold truncate w-[80%]">
            {user.type === "group" ? `${user.name} (Group)` : user.name}
          </p>
          {user.latestMessage && (
            <p className="text-xs text-gray-500">
              {extractTime(user.latestMessage?.createdAt)}
            </p>
          )}
        </div>
        {user.latestMessage && (
          <div className="flex gap-2 items-center text-sm text-gray-300 truncate">
            <span>{isFromMe ? <Check /> : <CheckCheck />}</span>
            <span>{user.latestMessage?.text}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatCard;
