import React from "react";
import UserChatHeader from "./UserChatHeader";
import SearchBar from "./SearchBar";
import ChatList from "./Cards/ChatList";
import UserSearch from "./UserSearch/UserSearch";
import useSearchUser from "@/store/useSearchUsers";

const UserChats = () => {
  const { searchTerm } = useSearchUser();

  return (
    <>
      <div
        className={`w-full p-1 py-4 relative border-r overflow-y-auto  border-gray-500 bg-[#272626]`}
      >
        <UserChatHeader />
        <SearchBar />
      </div>
        {searchTerm ? <UserSearch /> : <ChatList />}
    </>
  );
};

export default UserChats;
