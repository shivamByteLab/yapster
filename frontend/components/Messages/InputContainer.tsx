'use client'
import React, { FormEvent, useEffect, useRef, useState } from 'react'
import { Laugh, SendHorizontal } from 'lucide-react'
import useSendMessage from '@/hooks/Send-Messages/useSendMessage'

const InputContainer = () => {
  const [message, setMessage] = useState('')
  const {Loading,sendMessage} = useSendMessage()
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
}, [message,Loading])

  const SendMessage = (e:FormEvent)=>{
    e.preventDefault()
    if(!Loading){
    try {
      sendMessage(message) 
    } catch (error) {
      
    }finally{
    }
    setMessage('')
    }

  }
  return (
    <div className='w-full flex  items-center mb-1'>
    <form onSubmit={SendMessage} className='w-full bg-[#1d232a] rounded-full px-3 flex items-center'>
      <Laugh className='cursor-pointer'/>
      <input ref={inputRef} value={message} onChange={(e)=>setMessage(e.target.value)} disabled={Loading} type="text" placeholder="Type here" className="input border-0 focus:outline-none flex flex-1 w-full " />
      <SendHorizontal onClick={SendMessage} className='w-8 h-8 cursor-pointer'/>
    </form>
    </div>
  )
}

export default InputContainer