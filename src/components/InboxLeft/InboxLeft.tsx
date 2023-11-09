import cl from "./InboxLeft.module.css"
import { ConversationProps, useStoreContext } from "../../store/api";
import { useEffect, useMemo, useState } from "react";
import { ConvBox } from "../ConvBox/ConvBox";
import { Route } from "react-router-dom";

type InboxLeftProps ={
  getConversationInfo: (item: ConversationProps) => void;
}

export const InboxLeft=({getConversationInfo}:InboxLeftProps)=>{

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
             
             {conversations?.map((item:ConversationProps)=>{ 
                  return <ConvBox item={item} getConversationInfo={getConversationInfo}/>
                })
                }
              {!conversations&&<h3>Chats..</h3>}
              
           </div>
}