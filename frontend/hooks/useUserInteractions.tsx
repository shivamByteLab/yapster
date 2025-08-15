'use client'
import useChats from "@/store/useChats";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";



const useUserInteractions = () => {
  const [Loading, setLoading] = useState(false);
  const {chats:Chats,setChats}= useChats()

  useEffect(() => {
    async function getUserInteraction() {
      setLoading(true);
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/user-interactions/`,
          { withCredentials: true }
        );

        if (!res?.data) {
          throw new Error(res.statusText);
        }

        setTimeout(()=>{
          setChats(res.data.data); // Properly set the state here
        },1000)
      } catch (error) {
        toast.error("Error fetching user chats",{
          duration:7000
        })
      } finally {
        setLoading(false);
      }
    }

    getUserInteraction();
  }, []); // Only run once when the component mounts

  return { Loading, Chats };
};

export default useUserInteractions;
