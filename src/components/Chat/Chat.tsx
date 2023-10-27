import "../../main.css"
import { useStoreContext } from "../../store/api";
import { useEffect, useState } from "react";

export const Chat=()=>{ 
    const { messages, getMessages, sendMessage, user } = useStoreContext();
    const [text, setText]=useState<string>("")
  
    const handleMessage=async ()=>{ 
    console.log("handler worked")
     await sendMessage(text)//here 
     setText("")
     
    }
  
    useEffect(() => {
      
          const time= setInterval(()=>{
            getMessages()
          },3000);
       
         
        return ()=> clearInterval(time)
  
    
    }, []);

    return(
   <div className="chat_main">    
    <div className="conversation_containter">
        {messages?.map((message, index) => (
          <div  key={index}>
            <h3>{message.name}</h3>
            <p>{message.text}</p>
          </div>
        ))}
      </div>
      <div className="sender">
              <input placeholder="Type a message.."
                    className="sender_input" 
                    value={text}
                    onChange={(e)=>setText(e.target.value)} 
                    >
              </input>
              <button onClick={()=>handleMessage()}className="sender_button">Send</button>
        </div>
  </div> 
    )
}