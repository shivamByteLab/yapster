import useConversation from "@/store/useConversation";
import axios from "axios";
import { useState } from "react";

const useDeleteMessage = () => {
  const [Loading, setLoading] = useState(false);
  const { setMessages, messages, selectedConversation } = useConversation();

  const deleteMessage = async (messageId: string) => {
    if (!messageId || messageId === " ") {
      return;
    }
    try {
      setLoading(true);
      if (selectedConversation) {
        const response = await axios.post(
          `http://localhost:5050/api/delete/message`,
          {
            id: messageId,
          },
          {
            withCredentials: true,
          }
        );

        if (response.data.data) {
          setMessages([...messages, response.data.data]);
        }
      }

    //   if(selectedConversation && selectedConversation?.type === "user"){
    //     const response = await axios.post(`http://localhost:5050/api/sent/${selectedConversation?.id}`,{
    //         text: message,
    //       },
    //       {
    //         withCredentials: true,
    //       })
    //       if (response.data.data) {
    //         setMessages([...messages, response.data.data]);
    //       }
    //   }


    } catch (error) {
        //
    } finally {
      setLoading(false);
    }
  };
  return { Loading, deleteMessage };
};

export default useDeleteMessage;
