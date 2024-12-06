import useConversation from "@/store/useConversation";
import axios from "axios";
import { useState } from "react";

const useSendMessage = () => {
  const [Loading, setLoading] = useState(false);
  const { setMessages, messages, selectedConversation } = useConversation();

  const sendMessage = async (message: string) => {
    if (!message || message === " ") {
      return;
    }
    try {
      setLoading(true);
      if (selectedConversation && selectedConversation?.type === "group") {
        const response = await axios.post(
          `http://localhost:5050/api/send-group/${selectedConversation?.id}`,
          {
            text: message,
          },
          {
            withCredentials: true,
          }
        );

        if (response.data.data) {
          setMessages([...messages, response.data.data]);
        }
      }

      if(selectedConversation && selectedConversation?.type === "user"){
        const response = await axios.post(`http://localhost:5050/api/sent/${selectedConversation?.id}`,{
            text: message,
          },
          {
            withCredentials: true,
          })
          if (response.data.data) {
            setMessages([...messages, response.data.data]);
          }
      }


    } catch (error) {
        //
    } finally {
      setLoading(false);
    }
  };
  return { Loading, sendMessage };
};

export default useSendMessage;
