import cl from "./NavBurger.module.css"
import {SetStateAction,Dispatch} from "react"

type NavBurgerProps={ 
   
    setIsBurger:Dispatch<SetStateAction<boolean>>,
    navEls:object[],
}
export const NavBurger=()=>{ 

    return  <div className={cl.nav_burg_main}>
             </div>
}