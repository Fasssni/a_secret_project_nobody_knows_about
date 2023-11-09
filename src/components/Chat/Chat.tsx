import "../../main.css"
import { ConversationProps, useStoreContext } from "../../store/api";
import { useEffect, useState,FormEvent, useMemo} from "react";
import cl from  "./Chat.module.css"
import { DetailsPanel } from "../DetailsPanel/DetailsPanel";
import { ChatBar } from "../ChatBar/ChatBar";
import { TelegramSvg } from "../../utils/svg";

type ChatType={ 
  convId?:string,
  convInfo?:ConversationProps
}
export const Chat=({convId,convInfo}:ChatType)=>{ 
    const {sendMessage, chat, getUserChat, conversations} =  useStoreContext()
     
    const [text, setText]=useState<string>("")
    const chatInfo:ConversationProps[]|undefined=conversations?.filter(item=>item.id===parseInt(convId!))
    
    const handleMessage=async (e:FormEvent<HTMLFormElement>)=>{ 
        e.preventDefault()
        if(typeof convId===undefined) return
        if(chatInfo){
            await sendMessage(text,parseInt(convId!,10),chatInfo[0].to_id)
            setText("")
        }
    }
    
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

    console.log("Chat rerendered")

     

    return(
                <div className={cl.chat_main}>
                  {chat?
                <>
                
                <div className={cl.chat_window}>
                  <ChatBar client_name={convInfo?.client_name}
                           ChannelIcon={ChannelIcon}
                           />
                  <div className={cl.conv_items}>
                      {chat?.map((message, index) => (
                        <div  key={index} className={cl.message_main}>
                          <div className={cl.message_content}>
                            <h3>{message.name}</h3>
                            <p>{message.text}</p>
                          </div>
                          <p className={cl.message_date}>{message.createdAt.slice(0, 10)}</p>
                        </div>
                      ))}
                  </div>
                    <form className="sender"
                          onSubmit={(e)=>{handleMessage(e)}}
                          >
                            <input placeholder="Type a message.."
                                  className="sender_input" 
                                  value={text}
                                  onChange={(e)=>setText(e.target.value)} 
                                  >
                            </input>
                            <button className="sender_button">Send</button>
                      </form>
                     </div>
                     <DetailsPanel convInfo={convInfo}
                                   ChannelIcon={ChannelIcon}
                                   />
                    </>
                      :
                      <h3>No messages yet..</h3>
                      }
                </div> 
  )
}