import "../../main.css"
import { ConversationProps, useStoreContext } from "../../store/api";
import { useEffect} from "react";
import cl from  "./Chat.module.css"
import { ChatBar } from "../ChatBar/ChatBar";
import { EmptyMessageIcon, TelegramSvg } from "../../utils/svg";
import { ChatForm } from "../ChatForm/ChatForm";
import { MessageContainer } from "../MessageContainer/MessageContainer";

type ChatType={ 
  convId?:string,
  convInfo?:ConversationProps
}
export const Chat=({convId,convInfo}:ChatType)=>{ 
    const { chat, getUserChat, conversations, user} =  useStoreContext()
     
 
    const chatInfo:ConversationProps[]|undefined=conversations?.filter(item=>item.id===parseInt(convId!))


    
   
    
    const channels:Record<string, React.FC>={ 
      telegram:()=>TelegramSvg
      
          
  }


  const ChannelIcon=convInfo&&channels[convInfo.channel] 
   
   useEffect(() => {
      
      if(!convId)return 
      const socket=getUserChat(parseInt(convId,10))
   
   
      return ()=>{
        socket?.close()
        console.log("the connection is closed")
      }
                 
    }, [convId]);

  
    console.log(chat)

     

    return(
            <div className={cl.chat_container}>
              <div className={cl.chat_main}>
              {convId?
                <>
                <div className={cl.chat_window}>
                  <ChatBar 
                           ChannelIcon={ChannelIcon}
                           convId={convId}
                           {...convInfo!}
                           />
                    <div className={cl.conv_items}>
                        {chat?.map((message) => (
                            <MessageContainer message={message}
                                              name={user?.name}/>
                        ))}
                       
                    </div>
                    <ChatForm chatInfo={chatInfo} 
                              convId={convId}
                    />
                    </div>
                  </>
                      :
                      <EmptyMessage/>
                      }
                  </div>
                </div> 
  )
}

const EmptyMessage=()=>{ 
    return <div className={cl.empty_message}>
                <div className={cl.empty_message_container}>
                  <div className={cl.empty_message_icon}>
                    <EmptyMessageIcon/>
                  </div>
                  <div className={cl.empty_message_text}>
                     <h3 className={cl.em_title}>
                      Messages
                     </h3>
                     <p className={cl.em_desc}>
                      Click on a contact to view messages.
                     </p>
                  </div>
                </div>
          </div>
}