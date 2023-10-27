import {useState} from "react"
import { useStoreContext } from "../store/api"

export const Integrate=()=>{
    
    const [token,setToken]=useState<string>("")
    const {createBot}=useStoreContext()
    
    return <div className="integrate">
                <input onChange={(e)=>e.target.value}></input>
                <button onClick={()=>createBot()}>connect</button>
          </div>
}