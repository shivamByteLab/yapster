'use client';

import React from "react";
import { extractTime } from "@/helper/extractTime";
import { MessageType } from "@/types/messagesType";
import { useAuthContext } from "@/context/useAuthContext";


const Message = ({ message }: { message: MessageType }) => {
  const {authUser}  = useAuthContext()

  const fromMe = message.senderId === authUser?.user?.id; // Replace with real user ID


  return (
    <div
      className={`chat ${fromMe ? "chat-end" : "chat-start"}`}
    >
      <div className="chat-header mx-2">
        <span className="text-xs opacity-50"></span>
      </div>
      <div className="chat-bubble pb-4">
        {message.text}
        <time
          className={`absolute text-xs tracking-wide bottom-0 ${
            fromMe ? "right-2" : "left-2"
          } text-[0.7rem] opacity-50 text-gray-400`}
        >
          {extractTime(message.createdAt)}
        </time>
      </div>
    </div>
  );
};

export default Message;
