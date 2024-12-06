
export type ChatType = {
  id: string;
  name: string;
  avatar?: string;
  type?: "user" | "group";
  description?: string;
  createdAt?: string;
  updatedAt: string;
  latestMessage?: {
    text: string;
    createdAt: string;
    senderId: string;
  };
};
