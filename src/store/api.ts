import axios from "axios"
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

const path="http://localhost:5000/apiv"


export const signup= async ({user}:UserType)=>{ 
   
try{ 
    const response= await axios.post(`${path}/signup`, user)
    return response

  }catch(err){
        return err
  }
  
      
}

export const login=async({email, password}:LogingProps)=>{
    try{
        const response =await axios.post(`${path}/login`, {email, password})
        return response
    }catch(err){ 
        return err
    }

}