import { ListFilter, MessageSquarePlus, Settings } from "lucide-react";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "./ui/tooltip";

const UserChatHeader = () => {
  return (
    <div className="flex sticky top-0 z-10 bg-inherit justify-between p-2">
      <h1 className="text-3xl">Chats</h1>
       
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
          <TooltipTrigger> <Settings size={18} absoluteStrokeWidth /></TooltipTrigger>
            <TooltipContent>
              <p>Settings</p>
            </TooltipContent>
          </Tooltip>
      </div>
    </div>
  );
};

export default UserChatHeader;
