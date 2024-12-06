import { useHide } from "@/context/useHideProvider";
import useConversation from "@/store/useConversation";
import { ChevronLeft, Settings, Settings2 } from "lucide-react";
import React from "react";

const Header = () => {
  const { setIsHidden } = useHide();
  const { selectedConversation } = useConversation();
  return (
    <div className="w-full">
      <div className="w-full p-2 px-4 flex items-center sticky top-0 z-10  justify-between bg-[#252525] border-b-[1.5px] border-gray-600 flex-shrink">
        <div className="flex gap-2 items-center">
          <ChevronLeft
            className="md:hidden"
            onClick={() => setIsHidden(false)}
          />
          <img
            className="w-12 h-12"
            src={selectedConversation?.type==='group'?"https://avatar.iran.liara.run/public/job/designer/male":selectedConversation?.avatar}
            alt=""
          />
          <div className="">
            <span className="text-xl">{selectedConversation?.name}</span>
          </div>
        </div>
        {selectedConversation?.type === "group" && (
          <div className=""><Settings2 className="cursor-pointer" /></div>
        )}
      </div>
    </div>
  );
};

export default Header;
