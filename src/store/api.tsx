import axios from "axios"
import {createContext, useContext, useState, useEffect} from "react"

export type signupProps={
    name:string, 
    surname:string,
    email:string,
    password:string

}
export type UserType= { 
    user:signupProps,
}

export type LogingProps={
     email:string,
     password:string,
}

type StoreContextProps={ 
    login:({email,password}:LogingProps)=>string|Promise<void>, 
    signup:({user}:UserType)=>void, 
    checkAuth:()=>void,
    logout:()=>void,
    isAuth:boolean,
    user: UserProps|undefined,
    isLoading:boolean,


}

type UserProps={
    id:        number;
    name:      string;
    surname:   string;
    email:     string;
    
}

type ChildreType={
    children: React.ReactNode

}


const StoreContext=createContext({} as StoreContextProps)
export const useStoreContext=()=>useContext(StoreContext)


export const StoreContextProvider=({children}:ChildreType)=>{ 
     
const path="http://localhost:5000/apiv"

const [isAuth, setIsAuth]=useState<boolean>(false)
const [isLoading, setIsLoading]=useState<boolean>(false)
const [user, setUser]=useState<UserProps>()

const signup= async ({user}:UserType)=>{ 
try{ 
    await axios.post(`${path}/signup`, user)
    return "Вы успешно зарегистрированы"
  }catch(err){
        console.log(err)
  }
}

 const login=async({email, password}:LogingProps)=>{
    try{
        const response =await axios.post(`${path}/login`, {email, password}, {withCredentials:true})
        localStorage.setItem("accesToken",response.data.accessToken.accessToken)
        setUser(response.data.user)
        setIsAuth(true)
    }catch(err){ 
         console.log(err)
    }

}

 const checkAuth= async ()=>{ 
    try{
       setIsLoading(true)
       const response= await axios.get(`${path}/checkauth`, {withCredentials:true})
       setIsAuth(true)
       setUser(response.data)
       console.log(response)

    }catch(e){
        console.log(e)
    }finally{
        setTimeout(()=>{
          setIsLoading(false)
    },1000
        )
    }
    
}

const logout= async ()=>{ 
    try{ 
       const res= await axios.get(`${path}/logout`, {withCredentials:true})
       console.log(res)
    }catch(e){
        console.log(e)
    }

}

useEffect(()=>{console.log(isAuth)},[isAuth])



    return (
            <StoreContext.Provider 
                          value={{
                            login,
                            signup,
                            checkAuth,
                            isAuth,
                            user,
                            isLoading,
                            logout

                          }}
            >
              {children}
            </StoreContext.Provider>
    )

}