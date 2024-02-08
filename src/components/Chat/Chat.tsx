import "../../main.css";
import {
  ConversationProps,
  SocketResponseType,
  useStoreContext,
} from "../../store/api";
import { useEffect } from "react";
import cl from "./Chat.module.css";
import { ChatBar } from "../ChatBar/ChatBar";
import { ArrowBack, EmptyMessageIcon, TelegramSvg } from "../../utils/svg";
import { ChatForm } from "../ChatForm/ChatForm";
import { MessageContainer } from "../MessageContainer/MessageContainer";
import { useNavigate, useParams } from "react-router-dom";

type ChatType = {
  convInfo?: ConversationProps;
};
export const Chat = ({ convInfo }: ChatType) => {
  const { chat, getUserChat, conversations, user } = useStoreContext();
  const { conv_id } = useParams();
  const convId = conv_id;
  const navigate = useNavigate();

  const chatInfo: ConversationProps[] | undefined = conversations?.filter(
    (item) => item.id === parseInt(convId!)
  );

  const channels: Record<string, React.FC> = {
    telegram: () => TelegramSvg,
  };

  const ChannelIcon = convInfo && channels[convInfo.channel];

  useEffect(() => {
    let socket: SocketResponseType | null = null;
    async function runWS(convId: string) {
      socket = await getUserChat(parseInt(convId, 10));
    }

    if (!convId) return;
    runWS(convId);

    return () => {
      socket!.close();
      console.log("the connection is closed");
    };
  }, [convId]);

  return (
    <div className={`${cl.chat_container} ${!convId && cl.mob}`}>
      <div className={cl.chat_main}>
        {convId ? (
          <>
            <div className={cl.chat_window}>
              <div className={cl.link_back} onClick={() => navigate("/inbox")}>
                <ArrowBack />
              </div>
              <ChatBar
                ChannelIcon={ChannelIcon}
                convId={convId}
                {...convInfo!}
              />
              <div className={cl.conv_items}>
                {chat?.map((message, index) => (
                  <MessageContainer
                    message={message}
                    id={user?.id}
                    key={index}
                  />
                ))}
                <div className={cl.full}></div>
              </div>
              <ChatForm chatInfo={chatInfo} convId={convId} />
            </div>
          </>
        ) : (
          <EmptyMessage />
        )}
      </div>
    </div>
  );
};

const EmptyMessage = () => {
  return (
    <div className={cl.empty_message}>
      <div className={cl.empty_message_container}>
        <div className={cl.empty_message_icon}>
          <EmptyMessageIcon />
        </div>
        <div className={cl.empty_message_text}>
          <h3 className={cl.em_title}>Messages</h3>
          <p className={cl.em_desc}>Click on a contact to view messages.</p>
        </div>
      </div>
    </div>
  );
};
