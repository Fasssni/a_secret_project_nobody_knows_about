import cl from "./Telegram.module.css"
import {useState,FormEvent} from "react"

export const Telegram=()=>{ 
  const [token, setToken]=useState<string>("")
  const onSubmitHandler=(e:FormEvent<HTMLDivElement>)=>{ 
    e.stopPropagation()
    setToken("")

  }
  
  return <div className={cl.tg_main}
              onSubmit={(e)=>onSubmitHandler(e)}>
                <h3>Connect your <span style={{color:"#5871EB"}}>Telegram</span></h3>
                <form className={cl.bot_data}>
                     <input className={cl.bot_credentials}
                            placeholder="Bot token"
                            onChange={(e)=>setToken(e.target.value)}
                            value={token}
                            />
                     <input className={cl.bot_credentials}
                            placeholder="Greeting (optional)"
                            />
                     <button className={cl.submit_btn}>
                        Connect
                     </button>
                </form>

           </div>
}