import { FormEvent, useState } from "react"
import { ConversationProps, useStoreContext } from "../../store/api"

type ChatFormProps={ 
    chatInfo:ConversationProps[]|undefined,
    convId:string,
}
export const ChatForm=({chatInfo,convId}:ChatFormProps)=>{ 
    
    const {sendMessage} =  useStoreContext()
     
    const [text, setText]=useState<string>("")

    const handleMessage=async (e:FormEvent<HTMLFormElement>)=>{ 
        e.preventDefault()
        if(typeof convId===undefined) return
        if(chatInfo){
            await sendMessage(text,parseInt(convId!,10),chatInfo[0].to_id)
            setText("")
        }
    }

    return <form className="sender"
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
}