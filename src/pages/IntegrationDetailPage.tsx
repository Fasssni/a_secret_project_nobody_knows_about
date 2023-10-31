import { useParams } from "react-router-dom"
import { Telegram } from "../components/Telegram/Telegram"

export const IntegrationDetailPage=()=>{ 
    
    const { integration } = useParams<{ integration: string }>();
    const Integrations:Record<string, React.FC>={ 
        tg:Telegram, 
        instagram:()=><div>Insatgram</div>,
        waba:()=><div>Waba</div>,
        gmail:()=><div>Gmail</div>
    }

   const SelectedIntegration = Integrations[integration!.toLowerCase()];

    return <div className="in_details_main">
            {SelectedIntegration?<SelectedIntegration/>:"Integration Not Found :("}
           </div>
}