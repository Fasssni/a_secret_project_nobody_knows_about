import { Chat } from "../components/Chat/Chat";
import { InboxLeft } from "../components/InboxLeft/InboxLeft";
import { ConversationProps, useStoreContext } from "../store/api";
import { useCallback, useEffect, useRef, useState } from "react";

export const Inbox = () => {
  const [convInfo, setConvInfo] = useState<ConversationProps>();
  const { conversations, getConversations } = useStoreContext();

  const renderRef = useRef(0);

  const getCoversationInfo = useCallback((item: ConversationProps) => {
    setConvInfo(() => item);
  }, []);

  useEffect(() => {
    const socket = getConversations();
    console.log("INBOX USEFFECT WORKED");
    return () => {
      socket?.close();
      console.log("conversation socket is closed");
    };
  }, []);
  renderRef.current = renderRef.current + 1;
  console.log("INBOX RERENDERED", renderRef?.current);
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
