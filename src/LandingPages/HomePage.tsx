import { useEffect, useState } from "react"
import "../main.css"

export const HomePage=()=>{ 
    const [seconds, setSeconds]=useState<number>(0)

    console.log("rerendered!!!!!")
   
    return <>
                <div className="home_left">
                    <h1 className="namer">
                    Empower Your Business with AI-driven CRM
                    </h1>
                    <p className="description">Integrate and manage your channels seamlessly with our AI-powered customer relation management service.{seconds}</p>
                    <div className="buttons">
                        <button className="btn_left">Learn more</button>
                        <button className="btn_right">Sign up</button>
                    </div>
                </div>
                <div className="home_right">
            </div>
          </>
}
