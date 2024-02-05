import { Chat } from "../components/Chat/Chat";
import { InboxLeft } from "../components/InboxLeft/InboxLeft";
import { ConversationProps, useStoreContext } from "../store/api";
import { useCallback, useEffect, useState } from "react";

export const Inbox = () => {
  const [convInfo, setConvInfo] = useState<ConversationProps>();
  const { conversations, getConversations } = useStoreContext();

  const getCoversationInfo = useCallback((item: ConversationProps) => {
    setConvInfo(() => item);
  }, []);

  useEffect(() => {
    const socket = getConversations();

    return () => {
      socket?.close();
      console.log("conversation socket is closed");
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
