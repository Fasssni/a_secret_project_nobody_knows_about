import { ConversationProps } from "../../store/api"
import cl from "./DetailsPanel.module.css"

type PanelType={
    convInfo?:ConversationProps,
    ChannelIcon?:React.FC
}
export const DetailsPanel=({convInfo, ChannelIcon}:PanelType)=>{ 

    console.log("Panel has been rerendered")
    
    
    return <div className={cl.details_main}>
                 <div className={cl.details}> 
                    <h4 className={cl.title}>Channel</h4> 
                    <div className={cl.channel_name}>
                      {ChannelIcon?<ChannelIcon/>:""}
                      <p className={cl.bot_name}>{convInfo?.bot_name}</p>
                    </div>
                 </div> 
                 <div className={cl.details}> 
                    <h4 className={cl.title}>Details</h4>
                 </div>
           </div>
}