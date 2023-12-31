import {useState} from "react"

import styles from "../pageModules/Integrate.module.css"
import { useNavigate } from "react-router-dom";
import { ChannelsPage } from "../components/ChannelsPage/ChannelsPage";
import { ConnectedChannels } from "../components/ConnectedChannels/ConnectedChannels";

export const Integrate=()=>{
    
    const [token,setToken]=useState<string>("")
    const navigate=useNavigate()
  
    const onClickHandler=(link:string)=>{ 
        navigate(`${link}`)
    }

    return <div className={styles.integrate_main}>
             <ConnectedChannels/>
             <ChannelsPage onClickHandler={onClickHandler} />
           </div>;
        };
        
    
