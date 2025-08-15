interface GroupMemberType {
  id: string;
  userId: string;
  conversationId: string;
  role: "OWNER"|"MEMBER"|"ADMIN";
  user: {
    name: string;
    username: string;
    avatar: string;
  };
}
