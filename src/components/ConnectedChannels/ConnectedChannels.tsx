import { connectedChannelsType, useStoreContext } from "../../store/api"
import cl from "./ConnectChannels.module.css"
import {createContext, useContext, useState, useEffect} from "react"
import { ArrowSvg } from "../../utils/svg"

export const ConnectedChannels=()=>{ 

    const {getChannels}=useStoreContext()
    const [channels,setChannels]=useState<connectedChannelsType[]>()
    const [modal, setModal]=useState<boolean>(false)
    useEffect(()=>{ 
        const fetchData=async()=>{ 
            const res=await getChannels()
            setChannels(res)
        }

        fetchData()
    },[])


    useEffect(()=>{ 
        console.log(channels)
    },[channels])
    
    return <div className={cl.con_channels_main}>
            <div className={cl.con_channels_top}>
                <h3>Connected channels</h3>
                <div className={cl.arrow}
                     onClick={()=>setModal(!modal)}>
                    <ArrowSvg/>
                </div>
            </div>
            {modal&&
             <div className={cl.channel_list}>
                {channels?.map((item)=>{ 
                     return <p>{item.name}</p>
                })}
             </div>
                 }
           </div>
}