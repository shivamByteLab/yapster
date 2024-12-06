import { useAuthContext } from '@/context/useAuthContext'
import React from 'react'

const Banner = () => {
    const {authUser} = useAuthContext()
  return (
    <div className='w-full text-gray-500 h-full flex justify-center items-center'>
        <div className="text-center">
        <h1 className='text-6xl '>Welcome back</h1>
        <p>{authUser?.user?.name}</p>
        </div>
    </div>
  )
}

export default Banner