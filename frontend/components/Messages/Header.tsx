import { useHide } from "@/context/useHideProvider";
import useConversation from "@/store/useConversation";
import { ChevronLeft, MenuIcon, UserRoundPlus } from "lucide-react";
import React, { useRef, useState } from "react";
import HomeIcon from "../ui/home";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

const Header = () => {
  const { setIsHidden } = useHide();
  const [ShowMenu, setShowMenu] = useState(false);
  const { selectedConversation } = useConversation();

  // Sample data for members (replace this with actual group members)

  const members = [
    { id: 1, name: "Abhay Singh" },
    { id: 2, name: "John Doe" },
    { id: 3, name: "Jane Smith" },
    { id: 4, name: "Emily Brown" },
    { id: 5, name: "Chris Green" },
    { id: 6, name: "Alex Carter" },
    { id: 7, name: "Sophia Wilson" },
    { id: 8, name: "Sophia Wilson" },
    { id: 9, name: "Sophia Wilson" },
  ];

  return (
    <div className="w-full flex flex-col bg-[#252525] border-b-[1.5px] border-gray-600 text-white">
      {/* Header Section */}
      <div className="w-full p-2 px-4 flex items-center sticky top-0 z-10 justify-between">
        
            <div className="flex gap-2 items-center">
              <ChevronLeft
                className="md:hidden cursor-pointer text-white"
                onClick={() => setIsHidden(false)}/>
                <Sheet>
                <SheetTrigger>
              <img className="w-12 h-12 rounded-full object-cover"
                src={
                  selectedConversation?.avatar
                    ? selectedConversation?.avatar
                    : "https://avatar.iran.liara.run/public/job/designer/male"
                }
                alt="Avatar"
              />
              </SheetTrigger>
          {/* <Menu/> */}
        </Sheet>
              <div className="ml-2 flex flex-col">
                <span className="text-sm font-medium">
                  {selectedConversation?.name}
                </span>
                <span className="text-xs text-gray-600 font-medium">
                  {selectedConversation?.username}
                </span>
              </div>
            </div>
          
      </div>

      {/* Members Section */}
      {selectedConversation?.type === "group" && (
        <div className="w-full px-4 overflow-hidden">
          <ul className="flex gap-2 items-center text-xs text-gray-400 truncate">
            {members.map((member) => (
              <li key={member.id} className="line-clamp-1">
                ~{member.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Header;
