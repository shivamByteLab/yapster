export type Users = {
  id: string;
  name: string;
  username:string;
  avatar: string;
  createdAt?: string;
  updatedAt: string;
};
export type GroupType = {
  type: string;
  id: string;
  name: string;
  avatar: string ;
  updatedAt: string;
  createdAt: string;
  adminUserIds: [] | null;
  description: string;
};
