import { LatestMessage } from "@/types/messagesType";
import {create} from "zustand";

interface LatestMessageState {
  latestMessage: LatestMessage |{};
  setLatestMessage: (latestMessage: LatestMessage |{}) => void;
}

export const useLatestMessageStore = create<LatestMessageState>((set) => ({
  latestMessage: {},
  setLatestMessage: (latestMessage) => set({latestMessage})
  
}));
