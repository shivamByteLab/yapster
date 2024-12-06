'use client'
import useChats from "@/store/useChats";
import useConversation from "@/store/useConversation";
import { ChatType } from "@/types/ChatType";
import axios from "axios";
import { useEffect, useState } from "react";



const useUserInteractions = () => {
  const [Loading, setLoading] = useState(false);
  const {chats:Chats,setChats}= useChats()
  const {messages} = useConversation()

  useEffect(() => {
    async function getUserInteraction() {
      setLoading(true);
      try {
        const res = await axios.get(
          "http://localhost:5050/api/user/user-interactions/",
          { withCredentials: true }
        );

        if (!res?.data) {
          throw new Error(res.statusText);
        }

        setChats(res.data.data); // Properly set the state here
      } catch (error) {
        console.log("Error fetching user interactions:", error);
      } finally {
        setLoading(false);
      }
    }

    getUserInteraction();
  }, []); // Only run once when the component mounts

  return { Loading, Chats };
};

export default useUserInteractions;
