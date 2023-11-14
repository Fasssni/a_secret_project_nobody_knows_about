
import {useState, ChangeEvent, MouseEvent} from "react"
import { useNavigate } from "react-router-dom"
import { LogingProps,  useStoreContext } from "../store/api"

type LoginPropertyProps="email"|"password"

export const Login=()=>{ 
    const {login, checkAuth,error}=useStoreContext()
    const [showPassword, setShowPassword]=useState(false)
    
    const [creds, setCreds]=useState<LogingProps>({email:"",password:""})

    const navigate=useNavigate()

    const onChangeHandler=(e:ChangeEvent<HTMLInputElement>, property:LoginPropertyProps)=>{ 
        setCreds({...creds, [property]:e.target.value})

    }

    const loginHandler= async (e:MouseEvent<HTMLButtonElement>)=>{ 
         e.preventDefault()
         
         await login(creds)
         setCreds({...creds, email:"",password:""})
         if(!error){ 
            navigate("/") 
        }

        
        

    }
    
    return <div className="login_main">
                <form className="signup_form">
                    {error&&<p style={{color:"red"}}>{error.response.data}</p>}
                    <div className="greeting">
                        <h2 className="greeting_title">Welcome Back  👋</h2>
                        <p className="greeting_description">We are happy to have you back</p>
                    </div>
                    <input placeholder= "Enter email address"
                           className="credentials" 
                           type="email"
                           onChange={(e)=>onChangeHandler(e,"email")}
                           value={creds.email}
                           />
                    <div className="password">
                        <input placeholder= "Enter password"
                               className="credentials_password" 
                               type={showPassword?"text":"password"}
                               onChange={(e)=>onChangeHandler(e,"password")}
                               value={creds.password}
                               />
                        <div className="show_password" onClick={()=>setShowPassword((prev)=>!prev)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M12 9C11.2044 9 10.4413 9.31607 9.87868 9.87868C9.31607 10.4413 9 11.2044 9 12C9 12.7956 9.31607 13.5587 9.87868 14.1213C10.4413 14.6839 11.2044 15 12 15C12.7956 15 13.5587 14.6839 14.1213 14.1213C14.6839 13.5587 15 12.7956 15 12C15 11.2044 14.6839 10.4413 14.1213 9.87868C13.5587 9.31607 12.7956 9 12 9ZM12 17C10.6739 17 9.40215 16.4732 8.46447 15.5355C7.52678 14.5979 7 13.3261 7 12C7 10.6739 7.52678 9.40215 8.46447 8.46447C9.40215 7.52678 10.6739 7 12 7C13.3261 7 14.5979 7.52678 15.5355 8.46447C16.4732 9.40215 17 10.6739 17 12C17 13.3261 16.4732 14.5979 15.5355 15.5355C14.5979 16.4732 13.3261 17 12 17ZM12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5Z" fill="#7F8B9E"/>
                                </svg>
                        </div>
                    </div>
                    <button className="signup_button" 
                            onClick={(e)=>loginHandler(e)}
                            >
                            Login
                     </button>
                    <div className="redirect">
                        <p className="redirect_text">Don't have have an account?</p>
                        <a className="redirect_link" href="/signup">Sign up</a>
                    </div>
                </form>
                <h2 className="login_logo" onClick={()=>navigate("/")}>Quarter</h2>
           </div>
}