import { ListFilter, MessageSquarePlus, Settings } from "lucide-react";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "./ui/tooltip";
import { useHide } from "@/context/useHideProvider";
import { Separator } from './ui/separator';

const UserChatHeader = () => {
  const {showSetting,setShowSetting} = useHide()
  return (
    <div className="flex sticky top-0 z-1 light border-b border-b-white justify-between p-2">
     <div className="flex items-center">
            <img width={50} height={50} src="logo.png" alt="Logo"/>
            <h1 className="">Chats</h1>
          </div>
       
      <div className="flex gap-5">
          <Tooltip>
            <TooltipTrigger> <MessageSquarePlus size={18} absoluteStrokeWidth className="cursor-pointer " /></TooltipTrigger>
            <TooltipContent>
              <p>New Group</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
          <TooltipTrigger> <ListFilter size={18} absoluteStrokeWidth /></TooltipTrigger>
            <TooltipContent>
              <p>Filter</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
          <TooltipTrigger> <Settings onClick={()=>setShowSetting(!showSetting)} size={18} absoluteStrokeWidth /></TooltipTrigger>
            <TooltipContent>
              <p>Settings</p>
            </TooltipContent>
          </Tooltip>
      </div>
    </div>
  );
};

export default UserChatHeader;
