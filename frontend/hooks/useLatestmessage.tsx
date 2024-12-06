// import axios from "axios";
// import { useEffect, useState } from "react";

// interface LatestMessage {
//   key: {
//     id: string;
//     type: string;
//     name: string | null;
//     createdAt: string;
//     latesMessage: {
//       id:string;
//       text: string;
//       senderId: string;
//       receiverId: string;
//       createdAt: string;
//     };
//   };
// }

// interface ApiResponse {
//   latestMessage: LatestMessage | null;
//   error?: string;
// }

// const useLatestMessage = () => {
//   const [loading, setLoading] = useState(false);
//   // const [latestMessage, setLatestMessage] = useState();
//   let latestMessage = {}

//   useEffect(() => {
//     const getLatestMessage = async () => {

//       try {
//         setLoading(true);
  
//         // Determine the endpoint based on `isGroup`
//         const endpoint = "http://localhost:5050/api/latestMessages";
  
//         // Fetch the latest message
//         const response = await axios.get(endpoint, {
//           withCredentials: true,
//         });
  
//         // if (!response.data) {
//         //   console.error(
//         //     `Error fetching latest message`,
//         //   );
//         //   setLatestMessage({data:{}});
//         //   return;
//         // }
  
//         // Update state with the latest message
//         latestMessage = await response.data;
//         // console.log(latestMessage)
//       } catch (error) {
//         console.error("Error fetching latest message:", error);
//         // setLatestMessage(null);
//       } finally {
//         setLoading(false);
//       }
//     };
//     getLatestMessage()
//   }, [])

//   return { loading, latestMessage };
// };

// export default useLatestMessage;
