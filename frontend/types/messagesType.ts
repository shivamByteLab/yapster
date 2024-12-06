export interface MessageType {
  sender: any;
  id: string;
  text: string;
  receiverId: string;
  senderId: string;
  conversationId: string;
  createdAt: string;
  updatedAt: string;
}

export interface LatestMessage {
  key: {
    id: string;
    type: string;
    name: string | null;
    createdAt: string;
    latesMessage: {
      id:string;
      text: string;
      senderId: string;
      receiverId: string;
      createdAt: string;
    };
  };
}