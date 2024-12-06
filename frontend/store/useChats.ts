import { ChatType } from '@/types/ChatType';
import { create } from 'zustand';

interface ChatsState {
  chats: ChatType[] ;
  setChats: (chats: ChatType[]) => void;
  
}

const useChats = create<ChatsState>((set) => ({
  chats:[],
  setChats: (chats) => set({ chats }),
}));

export default useChats;
