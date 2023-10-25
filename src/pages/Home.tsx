import "../main.css"
import { useStoreContext } from "../store/api"
import { useUIContext } from "../store/uiContext"
import {useState, useEffect} from "react"

export const Home=()=>{

    const {isAuth, user}=useStoreContext()
    

    return(
        
    <div className="home">
    {isAuth
        ?
        <div className="userAccount">
            <h3>{user?.name}</h3>
            <h3>{user?.surname}</h3>
            <p>{user?.email}</p>

        </div>
        : <>
                <div className="home_left">
                    <h1 className="namer">
                     Empower Your Business with AI-driven CRM
                    </h1>
                    <p className="description">Integrate and manage your channels seamlessly with our AI-powered customer relation management service.</p>
                    <div className="buttons">
                        <button className="btn_left">Learn more</button>
                        <button className="btn_right">Sign up</button>
                    </div>
                </div>
                <div className="home_right">
              </div>
              </>
          
        }
     </div>
    )
}