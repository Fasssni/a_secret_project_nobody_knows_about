import { useNavigate } from "react-router-dom"
import { ConversationProps, useStoreContext } from "../../store/api"
import { useUIContext } from "../../store/uiContext"
import cl from "./ChatBar.module.css"

type ChatBarType={
    ChannelIcon?:React.FC, 
    convId: string,
}&ConversationProps



export const ChatBar=({client_name,ChannelIcon,convId,bot_name}:ChatBarType)=>{ 
    const {chatModal, handleChatModal, closeChatModal}=useUIContext()
    const {clearChat, removeChat}=useStoreContext()
    const navigate=useNavigate()

    const handlerRemoveChat=()=>{
        removeChat(convId); 
        closeChatModal();
        navigate("/inbox")
         
    }
    return <div className={cl.chatbar_container}>
            <div className={cl.chatbar_main}>
                <div className={cl.chatbar_title}>
                    <h4>{client_name}</h4>
                    <div style={{display:"flex"}}>
                        {ChannelIcon&&<ChannelIcon/>}
                        <p className={cl.bot_name}>{bot_name}</p>
                    </div>
                </div>
            <div className={cl.more_button}>
                <svg width="32" 
                     height="32" 
                     viewBox="0 0 32 32" 
                     fill="none" 
                     xmlns="http://www.w3.org/2000/svg" 
                     color="#8191a5"
                     onClick={(e)=>handleChatModal(e)}
                     >
                            <circle cx="11.5" cy="16.5" r="1.5" fill="#8191a5">
                            </circle>
                            <circle cx="20.5" cy="16.5" r="1.5" fill="#8191a5">
                            </circle>
                            <circle cx="16" cy="16.5" r="1.5" fill="#8191a5">
                            </circle>
                </svg>
             </div>
                {chatModal&&
                <div className={cl.chat_modal}>
                    <button className={cl.chat_modal_button}
                            onClick={()=>{
                               clearChat(convId);
                               closeChatModal();
                            }}
                            >
                            Clear chat
                    </button>
                    <button className={cl.chat_modal_button}
                            onClick={()=>{
                                handlerRemoveChat()
                            }}
                            >
                            Remove chat
                    </button>
                </div>}
            </div>
             
          </div>
}