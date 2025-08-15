import { ChatType } from '@/types/ChatType';
import { MessageType } from '@/types/messagesType';
import { create } from 'zustand';

interface ConversationState {
  selectedConversation: ChatType | null;
  setSelectedConversation: (selectedConversation: ChatType | null) => void;

  messages: MessageType[];
  setMessages: (messages: MessageType[]) => void;

  allMembers:GroupMemberType[];
  setAllMembers:(allMembers:GroupMemberType[])=>void;
}

const useConversation = create<ConversationState>((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) => set({ selectedConversation }),

  messages: [],
  setMessages: (messages) => set({ messages }),

  allMembers:[],
  setAllMembers:(allMembers)=>set({allMembers})

}));

export default useConversation;
