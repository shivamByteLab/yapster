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
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/newConversation/${id}`,{},{withCredentials:true})
            
            if(!response.data.data){
                console.log(response)
            }
            console.log(response)

            return true

        } catch (error) {
            throw new Error("Unable to add new user")
        }finally{
            setLoading(false)
        }
    }

    return {Loading,addnewUser}
}

export default useNewUser
