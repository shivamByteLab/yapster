import { ScrollArea } from "../ui/scroll-area";
import ShowDateWithMessage from "./messageDate/ShowDate";


const Messages = () => {

  return (
    <ScrollArea  className="w-full h-full z-10">
      <div className="flex flex-1 w-full ">
        <div  className="w-full m-2 h-full">
          <ShowDateWithMessage/>
        </div>
      </div>
    </ScrollArea>
  );
};

export default Messages;
