import { useState, useEffect } from "react";
import axios from "axios";
import useSearchUser from "@/store/useSearchUsers";

const useFetchUsers = (searchTerm: string) => {
  const {searchedUsers,setSearchedUsers} = useSearchUser()
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setSearchedUsers([]);
      return;
    }

    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/search?query=${searchTerm}`, {withCredentials:true});
        setSearchedUsers(response.data);
      } catch (err: any) {
        setError(err.response?.data?.error || "Failed to fetch users.");
      } finally {
        setLoading(false);
      }
    };

    const debounceTimeout = setTimeout(fetchUsers, 300); // Debounce for 300ms

    return () => clearTimeout(debounceTimeout);
  }, [searchTerm]);

  return { searchedUsers, loading, error };
};

export default useFetchUsers;
