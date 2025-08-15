import { HideProvider } from "@/context/useHideProvider";
import ChatSection from "./ChatSection";
import { TooltipProvider } from "./ui/tooltip";


export default function ChatComponents() {
  return (
    <TooltipProvider>
      
      <HideProvider>
        <div className="flex h-full bg-[#202020]">
          {/* sidebar */}

          {/* chatsection */}
          <ChatSection />
        </div>
      </HideProvider>
    </TooltipProvider>
  );
}
