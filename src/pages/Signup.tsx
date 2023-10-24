import { useState, ChangeEvent, useEffect} from "react"
import { useNavigate } from "react-router-dom"
import "../main.css"
import { signupProps, useStoreContext } from "../store/api"

type PropertyProps="name"|"email"|"surname"|"password"
export const Signup=()=>{
    const {signup}=useStoreContext()
    const [showPassword, setShowPassword]=useState(false)
    const navigate=useNavigate()

    const [user, setUser]=useState<signupProps>({name:"",surname:"", email:"", password:""})
    
    const onChangeHandler=(event:ChangeEvent<HTMLInputElement>,property:PropertyProps)=>{ 
        
        setUser({...user,[property]:event.target.value})


    }

    const signupHandler=async(e:ChangeEvent<HTMLButtonElement>)=>{ 
        e.preventDefault()
        console.log("1 worked")
        const res= await signup({user})
        console.log(res)
        setUser({name:"",surname:"", email:"", password:""})
    }

    useEffect(()=> { 
        console.log(user)
    },[user])

    return <div className="login_main">
                <form className="signup_form">
                    <div className="greeting">
                        <h2 className="greeting_title">Create an account👋</h2>
                        <p className="greeting_description">Kindly fill in details to create an account</p>
                    </div>
                    <div className="name_fields">
                       <input placeholder="Enter your name" 
                              onChange={(e)=>onChangeHandler(e,"name")} 
                              className="name_field"
                              value={user.name}
                              />
                       <input placeholder="Enter your surname" 
                              onChange={(e)=>onChangeHandler(e,"surname")} 
                              className="name_field" 
                              value={user.surname}
                              />
                    </div>
                    <input placeholder= "Enter email address" 
                           onChange={(e)=>onChangeHandler(e,"email")} 
                           className="credentials" 
                           type="email"
                           value={user.email}
                           />
                    <div className="password">
                       <input placeholder= "Create a password" 
                              className="credentials_password" 
                              type={showPassword?"text":"password"} 
                              onChange={(e)=>onChangeHandler(e,"password")}
                              value={user.password}
                              />
                       <div className="show_password" 
                            onClick={()=>setShowPassword((prev)=>!prev)}
                            >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M12 9C11.2044 9 10.4413 9.31607 9.87868 9.87868C9.31607 10.4413 9 11.2044 9 12C9 12.7956 9.31607 13.5587 9.87868 14.1213C10.4413 14.6839 11.2044 15 12 15C12.7956 15 13.5587 14.6839 14.1213 14.1213C14.6839 13.5587 15 12.7956 15 12C15 11.2044 14.6839 10.4413 14.1213 9.87868C13.5587 9.31607 12.7956 9 12 9ZM12 17C10.6739 17 9.40215 16.4732 8.46447 15.5355C7.52678 14.5979 7 13.3261 7 12C7 10.6739 7.52678 9.40215 8.46447 8.46447C9.40215 7.52678 10.6739 7 12 7C13.3261 7 14.5979 7.52678 15.5355 8.46447C16.4732 9.40215 17 10.6739 17 12C17 13.3261 16.4732 14.5979 15.5355 15.5355C14.5979 16.4732 13.3261 17 12 17ZM12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5Z" fill="#7F8B9E"/>
                            </svg>
                       </div>
                    </div>
                    <button className="signup_button" onClick={(e)=>signupHandler(e)} >Sign up!</button>
                    <div className="redirect">
                        <p className="redirect_text">Already have an account?</p>
                        <a className="redirect_link" href="/login">login</a>
                    </div>
                </form>
                <h2 className="login_logo" onClick={()=>navigate("/")}>Quarter</h2>
           </div>
}