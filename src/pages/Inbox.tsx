import { Chat } from "../components/Chat/Chat";
import { InboxLeft } from "../components/InboxLeft/InboxLeft";
import { useStoreContext } from "../store/api";
import { useEffect, useState } from "react";

export const Inbox = () => {

  return (
    <div className="inbox_main">
      <InboxLeft />
      <Chat/>
    </div>
  );
};
