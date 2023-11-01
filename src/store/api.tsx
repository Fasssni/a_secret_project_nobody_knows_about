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
    getMessages:()=> void,
    messages:MessageProps[]|undefined,
    sendMessage:(text:string,convId:number, toId:bigint)=>Promise<void>,
    getConversations:()=>void,
    conversations:ConversationProps[]|undefined,
    chat:MessageProps[]|undefined,
    getUserChat:(id:number, user_id:number)=>{close:()=>void}|undefined,
   

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

type MessageProps={ 
    user_id:number,
    text:string,
    name:string,
    conversation_id:number,
}

export type ConversationProps={ 
    id:number, 
    user_id:number,
    to_id:bigint,
    client_name:string,
    createdAt:Date,
    updatedAt:Date,
    user_pic:string,
}

type ChatProps={ 
    messages:MessageProps[],
    convInfo:ConversationProps
}

interface WebSocketMessage {
    type: string;
    data: any;
  }

const StoreContext=createContext({} as StoreContextProps)
export const useStoreContext=()=>useContext(StoreContext)


export const StoreContextProvider=({children}:ChildreType)=>{ 
     
const path="http://localhost:5000/apiv"
const msgURL="http://localhost:5000/tg"

const [isAuth, setIsAuth]=useState<boolean>(false)
const [isLoading, setIsLoading]=useState<boolean>(false)
const [user, setUser]=useState<UserProps>()
const [messages, setMessages]=useState<MessageProps[]>()
const [conversations, setConversations]=useState<ConversationProps[]>()
const [chat, setChat]=useState<MessageProps[]>()
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
        setIsLoading(true)
        const response =await axios.post(`${path}/login`, {email, password}, {withCredentials:true})
        localStorage.setItem("accesToken",response.data.accessToken.accessToken)
        setUser(response.data.user)
        setIsAuth(true)
    }catch(err){ 
         console.log(err)
    }finally{
        setIsLoading(false)
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
       setIsLoading(true)
       const res= await axios.post(`${path}/logout`, {withCredentials:true})
       console.log(res)
    }catch(e){
        console.log(e)
    }finally{
        setIsLoading(false)
    }

}

const sendMessage=async(text:string,convId:number, toId:bigint)=>{ 
    console.log (user)
    
    try{ 
        
        await  axios.post(`${msgURL}/sendmessage?id=${convId}`, {
            text:text, 
            name:user?.name, 
            user_id:user?.id,
            to_id:toId})
        
    }catch(e){ 
        console.log(e)
    }
}

const getMessages=async()=>{ 

    try{
        const data=await axios.get(`${msgURL}/getmgs?user_id=${user?.id}`)
        setMessages(data.data)
        console.log("here")
    }catch(e){ 
        console.log(e)
    }

}

const getConversations=async()=>{ 
    try{ 
        const res=await axios.get(`${msgURL}/conversations?user_id=${user?.id}`)
        setConversations(res.data)

    }catch(e){ 

    }
}



// const getUserChat=async(id:number)=>{ 
//     try{ 
        
//         const res=await axios.get(`${msgURL}/getchat/${id}?user_id=${user?.id}`)
//         setChat(res.data)
//     }catch(e){ 
//         console.log(e)
//     }
// }

const getUserChat=(id:number, user_id:number)=>{ 
    try{ 
        const socket=new WebSocket("ws://localhost:5001")
        socket.onopen=()=>{ 
            const data={ 
                method:"chat-connection", 
                conversation_id:id, 
                user_id

            }
            socket.send(JSON.stringify(data))
            console.log("the connection is open")
        }
        socket.onmessage=(event)=>{ 
           
            const messages=JSON.parse(event.data)
            console.log(messages)
            switch(messages.method){
                case "chat-connection":
                    console.log(messages, "here")
                    setChat(messages.messageData)
                    break
                case "message":
                    if(id===messages.message.conversation_id){
                    setChat((prev)=>[...prev!,messages.message])
                    }
                    break
            }
        }

        return {
            close:()=>socket.close()
        }
        
        
    }catch(e){ 
        console.log(e)
    }
}





useEffect(()=>{console.log(chat)},[chat])



    return (
     
            <StoreContext.Provider 
                          value={{
                            login,
                            signup,
                            checkAuth,
                            isAuth,
                            user,
                            isLoading,
                            logout,
                            getMessages,
                            messages,
                            sendMessage,
                            getConversations,
                            conversations,
                            chat,
                            getUserChat,

                          }}
            >
              {children}
            </StoreContext.Provider>
        
    )

}