// import useChats from "@/store/useChats"
import axios from "axios";
import { useState } from "react";

const useNewUser = () => {
    const [Loading, setLoading] = useState(false)
   
    const addnewUser = async(id:string)=>{
        setLoading(true)
        if(!id){
            return
        }

        try {
            const response = await axios.post(`http://localhost:5050/api/user/newConversation/${id}`,{},{withCredentials:true})
            
            if(!response.data){
                return
            }

            return true

        } catch (error) {
            return
        }finally{
            setLoading(false)
        }
    }

    return {Loading,addnewUser}
}

export default useNewUser
