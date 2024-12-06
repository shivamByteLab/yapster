import React from 'react'
import UserChatHeader from './UserChatHeader'
import SearchBar from './SearchBar'
import ChatList from './Cards/ChatList';
import UserSearch from './UserSearch/UserSearch';
import useSearchUser from '@/store/useSearchUsers';


const UserChats = () => {
  const {searchTerm} =  useSearchUser()

  return (
    <>
    <div className={`w-full  h-full relative border-r overflow-y-auto  border-gray-500 bg-[#353535]`}>
  <UserChatHeader/>
        <SearchBar/>
        {
          searchTerm? <UserSearch/> : <ChatList/>
        }
    </div>
    </>
  )
}

export default UserChats