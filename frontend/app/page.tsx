'use client';
import ChatComponents from "@/components/ChatComponents";
import SignIn from "./signin/page";
import { useAuthContext } from "@/context/useAuthContext";
import useUserInteractions from "@/hooks/useUserInteractions";

export default function Home() {
  const { authUser } = useAuthContext();
  const {Loading} = useUserInteractions()

  return (
    <div className="w-full h-[100dvh] text-white">
      {
        authUser && !Loading && <ChatComponents />
      }
      {
       !authUser && <SignIn/>
      }
    </div>
  );
}
