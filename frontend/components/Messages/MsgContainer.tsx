import React from "react";
import Header from "./Header";
import Messages from "./Messages";
import InputContainer from "./InputContainer";
import { useHide } from "@/context/useHideProvider";
import useConversation from "@/store/useConversation";
import Banner from "./Banner";
import useGetUserMessages from "@/hooks/useGetUserMessages";
import { Skeleton } from "../ui/skeleton";

const MsgContainer = () => {
  const { isHidden } = useHide();
  const { selectedConversation } = useConversation();
  const { Loading, messages } = useGetUserMessages();

  return (
    <div
      className={`${
        !isHidden && "max-md:hidden"
      } flex flex-col bg-[#3d3d3d] h-full items-center overflow-hidden w-full`}
    >
      {selectedConversation && (
        <>
          <Header />
          {!Loading && (
            <>
              <Messages />
              <InputContainer />
            </>
          )}
          {Loading && messages.length >0 &&  [...Array(3)].map((_, idx) => <Skeleton key={idx} />)}
        </>
      )}

      {!selectedConversation && <Banner />}
    </div>
  );
};

export default MsgContainer;
