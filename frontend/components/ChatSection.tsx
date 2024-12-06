'use client'
import React from "react";
import UserChats from "./UserChats";
import MsgContainer from "./Messages/MsgContainer";
import { useHide } from "@/context/useHideProvider";

const ChatSection = () => {
  const { isHidden } = useHide(); // Removed isMobile state
  return (
    <div className="flex-1 flex w-full h-full  rounded-md bg-[#2c2c2c]">
      {/* User Chat Section */}
      <div
        className={`
          ${isHidden ? "hidden" : " w-full z-10"} md:block flex flex-col md:w-[50%] h-full `}
      >
        <UserChats />
      </div>

      {/* User Messages */}
      <MsgContainer />
    </div>
  );
};

export default ChatSection;
