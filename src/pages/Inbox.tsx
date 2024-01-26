import { useParams } from "react-router-dom";
import { Chat } from "../components/Chat/Chat";
import { InboxLeft } from "../components/InboxLeft/InboxLeft";
import { ConversationProps } from "../store/api";
import {useState } from "react";

export const Inbox = () => {
  
  const {conv_id}=useParams()
  const [convInfo, setConvInfo]=useState<ConversationProps>()

  
  const getCoversationInfo=(item:ConversationProps)=>{ 
        setConvInfo(()=>item)
  }

 
  return (
    <div className="inbox_main">
      <InboxLeft  getConversationInfo={getCoversationInfo}/>
      <Chat convId={conv_id} convInfo={convInfo}/>
    </div>
  );
};
