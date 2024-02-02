import cl from "./InboxLeft.module.css";
import { ConversationProps } from "../../store/api";
import { memo } from "react";
import { ConvBox } from "../ConvBox/ConvBox";

type InboxLeftProps = {
  getConversationInfo: (item: ConversationProps) => void;
  conversations?: ConversationProps[];
};

export const InboxLeft = memo(
  ({ getConversationInfo, conversations }: InboxLeftProps) => {
    console.log(conversations, "Gegg");

    return (
      <div className={cl.inboxleft_main}>
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
              />
            );
          })}
          {!conversations && <h3>Chats..</h3>}
        </div>
      </div>
    );
  }
);
