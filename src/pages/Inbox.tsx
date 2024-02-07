import { Chat } from "../components/Chat/Chat";
import { InboxLeft } from "../components/InboxLeft/InboxLeft";
import {
  ConversationProps,
  SocketResponseType,
  useStoreContext,
} from "../store/api";
import { useCallback, useEffect, useState } from "react";

export const Inbox = () => {
  const [convInfo, setConvInfo] = useState<ConversationProps>();
  const { conversations, getConversations } = useStoreContext();

  const getCoversationInfo = useCallback((item: ConversationProps) => {
    setConvInfo(() => item);
  }, []);

  useEffect(() => {
    let socket: SocketResponseType | null = null;

    const connectSocket = async () => {
      socket = await getConversations();
    };

    connectSocket();
    return () => {
      try {
        socket!.close();
        console.log("The socket has been called");
      } catch (e) {
        console.log(e);
      }
    };
  }, []);

  return (
    <div className="inbox_main">
      <InboxLeft
        getConversationInfo={getCoversationInfo}
        conversations={conversations}
      />
      <Chat convInfo={convInfo} />
    </div>
  );
};
