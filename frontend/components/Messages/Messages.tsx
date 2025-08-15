import { ScrollArea } from "../ui/scroll-area";
import ShowDateWithMessage from "./messageDate/ShowDate";


const Messages = () => {

  return (

      <div className="flex flex-1 w-full ">
        <div  className="w-full m-2 h-full">
          <ShowDateWithMessage/>
        </div>
      </div>

  );
};

export default Messages;
