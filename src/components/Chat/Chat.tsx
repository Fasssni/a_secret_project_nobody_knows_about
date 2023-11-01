import "../../main.css"
import { ConversationProps, useStoreContext } from "../../store/api";
import { useEffect, useState,FormEvent} from "react";

export const Chat=({convId}:{convId:string})=>{ 
    const {sendMessage, chat, getUserChat, conversations} = useStoreContext();
    const [text, setText]=useState<string>("")
    const chatInfo:ConversationProps[]|undefined=conversations?.filter(item=>item.id===parseInt(convId))
    
    const handleMessage=async (e:FormEvent<HTMLFormElement>)=>{ 
        e.preventDefault()
        if(typeof convId===undefined) return
        if(chatInfo){
            await sendMessage(text,parseInt(convId,10),chatInfo[0].to_id)
            setText("")
        }
    }
    
   

   
  
    
    useEffect(() => {
      
      if(!convId)return 
      const socket=chatInfo&&getUserChat(parseInt(convId,10),chatInfo[0].user_id)
      return ()=>socket?.close()
                 
    }, [convId]);
     

    return(
   <div className="chat_main">    
    <div className="conversation_containter">
        {chat?.map((message, index) => (
          <div  key={index}>
            <h3>{message.name}</h3>
            <p>{message.text}</p>
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
    )
}