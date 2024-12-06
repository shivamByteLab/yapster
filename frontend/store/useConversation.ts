import { ChatType } from '@/types/ChatType';
import { MessageType } from '@/types/messagesType';
import { Users } from '@/types/UsersType';
import { create } from 'zustand';

interface ConversationState {
  selectedConversation: ChatType | null;
  setSelectedConversation: (selectedConversation: ChatType | null) => void;

  messages: MessageType[];
  setMessages: (messages: MessageType[]) => void;
}

const useConversation = create<ConversationState>((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) => set({ selectedConversation }),

  messages: [],
  setMessages: (messages) => set({ messages }),
}));

export default useConversation;
