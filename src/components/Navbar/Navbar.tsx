import { Signup } from "../../pages/Signup"
import { useStoreContext } from "../../store/api"
import cl from "./Navbar.module.css"
import {useNavigate, useLocation} from "react-router-dom"

export const Navbar=()=>{ 

    const navEls=[
        {   id:0,
            title:"CRM",
            link:'/'
        },
        {   id:1,
            title: "AI-agent",
            link:'/'
        },
        {   id:2,
            title:"Integrarions", 
            link:"/"
        },
    ]

    const navigate=useNavigate()
    const location=useLocation()
    const lp=location.pathname

    const {isAuth, logout}=useStoreContext()

  

    return <nav className={cl.navbar_main} style={{display:lp==="/login"||lp==="/signup"?"none":"flex"}}>
                <h2 className={cl.logo} onClick={()=>navigate("/")}>Quarter</h2>
                <div className={cl.right_side}>
                    <ol className={cl.list_group}>
                        {navEls.map((el)=><li key={el.id}>{el.title}</li>)}
                    </ol>
                    {isAuth
                    ?
                    <div className="buttons">
                            <button className={cl.profile_icon}></button>
                            <button className="btn_right" onClick={()=>logout()}>Log out</button>
                    </div>
                    :
                    <div className="buttons">
                            <button className="btn_left"  onClick={()=>navigate("/login")} >Login</button>
                            <button className="btn_right" onClick={()=>navigate("/signup")}>Sign up</button>
                    </div>}
                </div>
                
           </nav>
}