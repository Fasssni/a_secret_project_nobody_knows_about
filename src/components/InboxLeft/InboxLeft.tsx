import cl from "./InboxLeft.module.css";
import { ConversationProps } from "../../store/api";
import { memo } from "react";
import { ConvBox } from "../ConvBox/ConvBox";
import { useParams } from "react-router-dom";

type InboxLeftProps = {
  getConversationInfo: (item: ConversationProps) => void;
  conversations?: ConversationProps[];
};

export const InboxLeft = memo(
  ({ getConversationInfo, conversations }: InboxLeftProps) => {
    const { conv_id } = useParams();

    return (
      <div className={`${cl.inboxleft_main} ${conv_id && cl.mobile}`}>
        <h3 className={cl.label}>Contacts</h3>
        <div className={cl.searchinput}>
          <input className={cl.conv_input} placeholder="Search"></input>
        </div>
        <div className={cl.inbox_conversations}>
          {conversations?.map((item: ConversationProps, index) => {
            return (
              <ConvBox
                item={item}
                getConversationInfo={getConversationInfo}
                key={index}
                conv_id={conv_id}
              />
            );
          })}
          {!conversations && <h3>Chats..</h3>}
        </div>
      </div>
    );
  }
);
