import { useNavigate, useParams } from "react-router-dom"
import { Telegram } from "../components/Telegram/Telegram"
import { useStoreContext } from "../store/api";

export const IntegrationDetailPage=()=>{ 
    
    const { integration } = useParams<{ integration: string }>();
    const {isAuth}=useStoreContext()
    const navigate=useNavigate()
    const Integrations:Record<string, React.FC>={ 
        tg:Telegram, 
        instagram:()=><div>Insatgram</div>,
        waba:()=><div>Waba</div>,
        gmail:()=><div>Gmail</div>
    }

   const SelectedIntegration = Integrations[integration!.toLowerCase()];
    
    return <div className="in_details_main">
            {isAuth?
            SelectedIntegration?<SelectedIntegration/>:"Integration Not Found :("
             :
             <h2>Please <span style={{color:"#5871EB", cursor:"pointer"}} onClick={()=>navigate("../../login")}>Sign In</span> first</h2>
             }
           </div>
}