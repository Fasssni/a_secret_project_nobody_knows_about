import {useState} from "react"
import { useStoreContext } from "../store/api"
import integrationsData from "../utils/IntegrationData.json"
import styles from "../pageModules/Integrate.module.css"
import { useNavigate } from "react-router-dom";

export const Integrate=()=>{
    
    const [token,setToken]=useState<string>("")
    const navigate=useNavigate()
  
    const onClickHandler=(link:string)=>{ 
        navigate(`${link}`)
    }
    return (
          <div className={styles.integratePage}>
            <h1>Integrations</h1>
            <div className={styles.integrationContainer}>
                {integrationsData.map((integration, index) => (
                    <div key={index} 
                        className={styles.integrationCard}
                        onClick={()=>onClickHandler(integration.link)}
                        >
                    <img
                        src={integration.imageUrl}
                        alt={integration.title}
                        className={styles.integrationIcon}
                    />
                    <h2 className={styles.integrationTitle}>{integration.title}</h2>
                    <p className={styles.integrationDescription}>{integration.description}</p>
                    </div>
                ))}
                </div>
            </div>
            );
        };
        
    
