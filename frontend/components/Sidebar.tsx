"use client";
import { AlignJustify, MessageCircleMore } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { useHide } from "@/context/useHideProvider";
import { useAuthContext } from "@/context/useAuthContext";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useConversation from "@/store/useConversation";

const SidebarComponent = () => {
  const { isHidden, setIsHidden } = useHide();
  const { authUser } = useAuthContext();
  const {selectedConversation} = useConversation()
  
  const handleHide = () => {
    if(selectedConversation){
      setIsHidden(!isHidden)
    }
  };
  return (
    <div
      className={`${
        isHidden &&selectedConversation && "hidden"
      } relative md:block z-10  w-10  overflow-hidden  left-0 bg-[#202020] flex flex-col items-center gap-3 mt-6`}
    >
      <div className="flex flex-col items-center">
        <AlignJustify
        className="py-1 mb-8 md:hidden rounded  hover:bg-[#353535] cursor-pointer"
        size={32}
        onClick={() => handleHide}
      />

      <Tooltip>
        <TooltipTrigger>
          <MessageCircleMore
            className=" mb-3 rounded  hover:bg-[#353535]"
            size={32}
          />
        </TooltipTrigger>
        <TooltipContent>
          <p>Chats</p>
        </TooltipContent>
      </Tooltip>
      </div>

      <div className="w-full  h-[1.5px] bg-[#353535]"></div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="avatar online p-1  absolute bottom-4 right-2">
            <div className="ring-primary ring-offset-base-100 max-w-12 rounded-full ring ring-offset-2">
              <img src={authUser?.user?.avatar} />
            </div>
          </div>
        </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            {/* <DropdownMenuItem>Billing</DropdownMenuItem>*/}
            <DropdownMenuItem>Logout</DropdownMenuItem> 
          </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SidebarComponent;
