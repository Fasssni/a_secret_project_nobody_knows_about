import { useStoreContext } from "../store/api";
import { useEffect } from "react";

export const Inbox = () => {
  const { messages, getMessages } = useStoreContext();

//   useEffect(() => {
//     const intervalId = setInterval(async () => {
//       try {
//         await getMessages();
//       } catch (e) {
//         console.error("Error fetching messages:", e);
//       }
//     }, 1000);

    // Cleanup function to clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [getMessages]);

  return (
    <div className="inbox_main">
      {messages?.map((message, index) => (
        <p key={index}>{message.text}</p>
      ))}
    </div>
  );
};
