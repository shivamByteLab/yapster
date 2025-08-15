import React, { useEffect, useState } from "react";
import useUserSearch from "@/hooks/useUserSearch";
import useSearchUser from "@/store/useSearchUsers";
import { ScrollArea } from "../ui/scroll-area";
import useNewUser from "@/hooks/New-Conversation/useNewUser";
import useConversation from "@/store/useConversation";
import { ChatType } from "@/types/ChatType";
import useChats from "@/store/useChats";
import toast from "react-hot-toast";

const UserSearch = () => {
  const { searchTerm, setSearchTerm } = useSearchUser();
  const { searchedUsers, loading, error } = useUserSearch(searchTerm);
  const { Loading, addnewUser } = useNewUser();
  const { setSelectedConversation } = useConversation();
  const {setChats,chats} = useChats()

  const [newUser, setNewUser] = useState<ChatType>();

  useEffect(() => {
    if (newUser) {
      setChats([...chats,newUser])
      setSelectedConversation(newUser)
      const addUser = async () => {
        try {
          const res = await addnewUser(newUser.id);
          if (res) {
            setSearchTerm("");
          }
        } catch (error:any) {
         toast.error(error);
        }
      };
      
      addUser();
    }
  }, [newUser]);

  const handle = (user: ChatType) => {
    setNewUser({
      ...newUser,
      id: user.id,
      latestMessage: undefined,
      type: "user",
      name: user.name,
      updatedAt: user.updatedAt,
      avatar: user.avatar,
    });
  };

  return (
    <ScrollArea className="w-full ">
      <div className="w-full">
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <ul className="grid gap-3 p-2 mt-1">
          {searchedUsers?.map((user) => (
            <li
              key={user.id}
              onClick={() => handle(user)}
              className="flex items-center gap-4 p-1 border-b border-gray-700 hover:bg-[#2d2d2d] cursor-pointer "
            >
              <img
                src={user.avatar}
                alt={`${user.name}'s avatar`}
                className="w-12 h-12 rounded-full"
              />
              <div className="w-full ">
                <p className="text-xl truncate">{user.username}</p>
                <p className="text-gray-500 text-sm">{user.name}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </ScrollArea>
  );
};

export default UserSearch;
