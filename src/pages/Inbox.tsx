import { useParams } from "react-router-dom";
import { Chat } from "../components/Chat/Chat";
import { InboxLeft } from "../components/InboxLeft/InboxLeft";
import { useStoreContext } from "../store/api";
import { useEffect, useState } from "react";

export const Inbox = () => {
  
  const {conv_id}=useParams()
  
 
  return (
    <div className="inbox_main">
      <InboxLeft />
      <Chat convId={conv_id}/>
    </div>
  );
};
