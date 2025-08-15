import { useAuthContext } from '@/context/useAuthContext'
import React from 'react'

const Banner = () => {
    const {authUser} = useAuthContext()
  return (
    <div className='w-full text-gray-400 h-full flex justify-center items-center'>
        <div className="text-center flex flex-col justify-center items-center">
          <div className="">
            <img width={100} height={100} src="logo.png" alt="Logo"/>
          </div>
        <h1 className='text-6xl '>Welcome Back</h1>
        <p className='text-3xl '>{authUser?.user?.name}</p>
        <p className="py-6 text-gray-600">
        Yapster is a playful and unique chat app designed to bring energy and excitement to conversations. With its vibrant design and user-friendly features, Yapster makes messaging fun, fast, and seamless. 
        Whether you're chatting with friends, family, or coworkers, Yapster ensures every interaction feels lively 
        and engaging.
        </p>
        </div>
    </div>
  )
}

export default Banner