import cl from "./InboxLeft.module.css"
import { ConversationProps, useStoreContext } from "../../store/api";
import { memo, useEffect, useMemo, useState } from "react";
import { ConvBox } from "../ConvBox/ConvBox";
import { Route } from "react-router-dom";
import { Searcher } from "../../utils/svg";

type InboxLeftProps ={
  getConversationInfo: (item: ConversationProps) => void;
}

export const InboxLeft=memo(({getConversationInfo}:InboxLeftProps)=>{

    const {conversations,getConversations}=useStoreContext()

  

  useEffect(()=>{ 
        const socket= getConversations()
 
        return  ()=>{ 
           socket?.close()
           console.log("conversation socket is closed")
        }
  }, [])

  console.log(conversations, "Gegg")
   

    return <div className={cl.inboxleft_main}>
            <h3 className={cl.label}>Contacts</h3>
            <div className={cl.searchinput}>
              <input className={cl.conv_input}
                     placeholder="Search"
               >
               </input>
            </div>
            <div className={cl.inbox_conversations}>
             {conversations?.map((item:ConversationProps)=>{ 
                  return <ConvBox item={item} getConversationInfo={getConversationInfo}/>
                })
                }
              {!conversations&&<h3>Chats..</h3>}
             </div>
           </div>
}
)