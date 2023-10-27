import cl from "./InboxLeft.module.css"
import { useStoreContext } from "../../store/api";
import { useEffect, useState } from "react";
import { ConvBox } from "../ConvBox/ConvBox";

export const InboxLeft=()=>{

    const {conversations,getConversations}=useStoreContext()

  useEffect(()=>{ 
    const time=setInterval(()=>{
        getConversations()
    }, 2000)

    return ()=>clearInterval(time)
  })


    return <div className={cl.inboxleft_main}>

             {conversations?.map((item)=>{ 
                  return <ConvBox key={item.id} {...item}/>
                })
                }
           </div>
}