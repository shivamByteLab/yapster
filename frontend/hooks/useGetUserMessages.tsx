'use client'
import useConversation from "@/store/useConversation";
import axios from "axios";
import { useEffect, useState } from "react"

const useGetUserMessages =()=>{
    const [Loading, setLoading] = useState(false);
    const {setMessages,messages,selectedConversation} = useConversation()

    useEffect(() => {
        const getMessages = async()=>{
            setLoading(true)
            const endpoint = selectedConversation?.type === "group"
          ? `http://localhost:5050/api/${selectedConversation?.id}/messages`
          : `http://localhost:5050/api/get/${selectedConversation?.id}`;

            if(!selectedConversation?.id){
                return
            }
            
                const response = await axios.get(endpoint,{withCredentials:true})
                setMessages(response.data.data)
            

    
            setLoading(false)
        }

        getMessages()

    }, [selectedConversation?.id,setMessages])

    return {Loading,messages}
}

export default useGetUserMessages