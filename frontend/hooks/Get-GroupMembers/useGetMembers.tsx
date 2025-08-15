import useConversation from "@/store/useConversation";
import axios from "axios";
import toast from "react-hot-toast";

const useGetMembers = () => {
  const {allMembers,setAllMembers} = useConversation();

  const getGroupMembers = async(id:string)=>{
    if(!id) return toast.error("id not provided")

        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${id}/members`,{withCredentials:true})

            const Memberdata = response.data.data;

            if(!Memberdata)return toast.error("NO 'member found'");

            setAllMembers([...allMembers,Memberdata])
        } catch (error) {
            toast.error("!ERROR Refresh the page")
        }
  }
  return {getGroupMembers}
}

export default useGetMembers