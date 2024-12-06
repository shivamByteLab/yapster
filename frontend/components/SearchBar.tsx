'use client'
import React, {useEffect, useRef } from 'react'
import { SearchIcon, X } from 'lucide-react';
import useSearchUser from '@/store/useSearchUsers';



const SearchBar = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const {searchTerm,setSearchTerm} =  useSearchUser()
    
    useEffect(() => {
        inputRef.current?.focus();
    }, [])

  return (
    <div className="rounded-md w-full sticky top-12  z-10 bg-inherit  mx- px-1 h-8 border-b-[2.5px] focus-within:border-b-green-600 border-b-[#656565] flex">
        <div className="w-6 p-1 flex items-center">
        <SearchIcon/>
        </div>
      <form className='flex-1 flex px-2 items-center h-full' >
        <input ref={inputRef} type="text" value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} className='bg-transparent border-none outline-none h-full w-full'/>
        {searchTerm && <X onClick={()=>setSearchTerm('')} className='cursor-pointer'/>
        }
      </form>
    </div>
  )
}

export default SearchBar