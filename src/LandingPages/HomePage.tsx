import { useEffect, useState } from "react"
import "../main.css"

import axios from "axios"

export const HomePage=()=>{ 
    const [seconds, setSeconds]=useState<number>(0)

    const args:number[]= [4,5 ,6, 7]
 
    function test(...args){

        console.log(JSON.stringify(args))
    }
   
    test(1,3 ,4, 5)

    const test2= {1: "wWFWFWF"}

    console.log(JSON.stringify(test2))
   
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

