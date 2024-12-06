import { MessageType } from "@/types/messagesType";

const groupMessagesByDate = (messages: MessageType[]) => {
    const grouped: { [key: string]: MessageType[] } = {};
    messages.forEach((message) => {
      const dateKey = new Date(message.createdAt).toDateString();
      if (!grouped[dateKey]) grouped[dateKey] = [];
      grouped[dateKey].push(message);
    });
    return grouped;
  };

export default groupMessagesByDate