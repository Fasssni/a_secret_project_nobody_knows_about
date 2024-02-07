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
  const { conversations, getConversations, isWsConnected } = useStoreContext();

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
      {!isWsConnected && <WSFailed />}
    </div>
  );
};

const WSFailed = () => {
  const [show, setShow] = useState<boolean>();

  const handleHide = () => {
    localStorage.setItem("toHide", "false");
    setShow(false);
  };

  useEffect(() => {
    const val = localStorage.getItem("toHide");
    setShow(() => {
      if (!val) return true;
      return false;
    });
  }, []);

  return (
    show && (
      <div className="wsfailed_main">
        <h3 className="wsfailed_title">Please, note:</h3>
        <p>
          Our websocket connection is currently off. We recommend you to
          occasianally refresh the page to keep your messages up to date
        </p>
        <button className="wsfailed_btn" onClick={handleHide}>
          Hide
        </button>
      </div>
    )
  );
};
