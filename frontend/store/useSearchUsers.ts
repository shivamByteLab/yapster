import { Users } from '@/types/UsersType';
import { create } from 'zustand';

interface SearchState {
 searchedUsers: Users[];
  setSearchedUsers: (searchedUsers: Users[]) => void;

  searchTerm: string;
  setSearchTerm:(searchTerm:string) =>void;
}

const useSearchUser = create<SearchState>((set) => ({
 searchedUsers: [],
  setSearchedUsers: (searchedUsers) => set({searchedUsers }),

  searchTerm:'',
  setSearchTerm:(searchTerm)=>set({searchTerm})
}));

export default useSearchUser;
