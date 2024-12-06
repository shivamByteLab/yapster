"use client";
import React, { useEffect, useRef } from "react";
import { MessageType } from "@/types/messagesType";
import Message from "../UserMessage/Message";
import useConversation from "@/store/useConversation";
import GroupMessage from "../GroupMessage/GroupMessage";
import formatDate from "@/helper/formateDate";
import groupMessagesByDate from "@/helper/groupMessagesByDate";
import useGetUserMessages from "@/hooks/useGetUserMessages";


const ShowDateWithMessage = () => {
  const { selectedConversation } = useConversation();
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const {Loading, messages} = useGetUserMessages()

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "instant" });
  }, [messages]);


  if (messages.length===0) return (
    <p className="text-center">
      Send a message to start the conversation
    </p>
  )

  const groupedMessages = groupMessagesByDate(messages);


  const renderMessage = (message: MessageType) => {
    if (selectedConversation?.type === "user") {
      return <Message key={message.id} message={message} />;
    }
    if (selectedConversation?.type === "group") {
      return <GroupMessage key={message.id} message={message} />;
    }
    return null;
  };

  return (
    <div >
      {Object.entries(groupedMessages).map(([date, messages], dateIndex) => (
        <div key={dateIndex} className="date-group">
          {/* Sticky date header */}
          <div className="sticky top-0 z-10 text-center py-2 text-gray-500">
            {formatDate(messages[0].createdAt)}
          </div>

          {messages.map((message, messageIndex) => (
            <div
            className=""
              key={message.id}
              ref={
                dateIndex === Object.entries(groupedMessages).length - 1 &&
                messageIndex === messages.length - 1
                  ? lastMessageRef
                  : null
              }
            >
              
              {renderMessage(message)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ShowDateWithMessage;
