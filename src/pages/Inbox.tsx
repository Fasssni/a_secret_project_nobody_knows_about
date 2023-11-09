import { useNavigate, useParams } from "react-router-dom";
import { Chat } from "../components/Chat/Chat";
import { InboxLeft } from "../components/InboxLeft/InboxLeft";
import { ConversationProps, useStoreContext } from "../store/api";
import { useEffect, useState } from "react";

export const Inbox = () => {
  
  const {conv_id}=useParams()
  const [convInfo, setConvInfo]=useState<ConversationProps>()
  const navigate=useNavigate()
  
  const getCoversationInfo=(item:ConversationProps)=>{ 
        setConvInfo((prev)=>item)
  }

 
  return (
    <div className="inbox_main">
      <InboxLeft  getConversationInfo={getCoversationInfo}/>
      <Chat convId={conv_id} convInfo={convInfo}/>
    </div>
  );
};
