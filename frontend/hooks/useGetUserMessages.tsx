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
          ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/${selectedConversation?.id}/messages`
          : `${process.env.NEXT_PUBLIC_BACKEND_URL}/get/${selectedConversation?.id}`;

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