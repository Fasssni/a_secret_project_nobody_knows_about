import axios, { AxiosError } from "axios"
import {createContext, useContext, useState, useEffect} from "react"
import { useNavigate } from "react-router-dom"


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
    createdAt:string,
}

export type ConversationProps={ 
    id:number, 
    user_id:number,
    to_id:bigint,
    client_name:string,
    createdAt:Date,
    updatedAt:Date,
    user_pic:string,
    bot_name:string,
    channel: string
}

type ChatProps={ 
    messages:MessageProps[],
    convInfo:ConversationProps
}

interface WebSocketMessage {
    type: string;
    data: any;
  }

export type connectedChannelsType={
    name: string,
    id: number,
    channel:string
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
    getConversations:()=>{close:()=>void}|undefined,
    conversations:ConversationProps[]|undefined,
    chat:MessageProps[]|undefined,
    getUserChat:(id:number)=>{close:()=>void}|undefined,
    createTgBot:(token:string)=>void,
    error:any,
    clearChat:(conv_id:string)=>void,
    removeChat:(conv_id:string)=>void,
    
    getChannels:()=>Promise<any>|undefined,
   

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
 
 const [error, setError]=useState<any>()

 const login=async({email, password}:LogingProps)=>{
    try{
        setIsLoading(true)
        const response =await axios.post(`${path}/login`, {email, password}, {withCredentials:true})
        console.log(response)
        setUser(response.data.user)
        setIsAuth(true)
    }catch(err:any){ 
         console.log(err)
         setError(err)
    }finally{
        setIsLoading(false)
    }

}


 const checkAuth= async ()=>{ 
    try{
       setIsLoading(true)
       const response= await axios.get(`${path}/checkauth`, {withCredentials:true})
       console.log(response.status, "status")
      if(response.status===201){
        setIsAuth(true)
        setUser(response.data)
        console.log(response)
       }
    }catch(e:any){
         console.log(e)
         if(e.response.status===401){ 
            setIsAuth(false)
            console.log(e)
         }
        
        
    }finally{
          setIsLoading(false)
    }
    
}


const logout= async ()=>{ 
    try{ 
       setIsLoading(true)
       const res= await axios.post(`${path}/logout`, {},{withCredentials:true})
       await checkAuth()
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
            to_id:toId
        })
        
    }catch(e){ 
        console.log(e)
    }
}

const getMessages=async()=>{ 

    try{
        const data=await axios.get(`${msgURL}/getmgs?user_id=${user?.id}`)
        setMessages(data.data)
    }catch(e){ 
        console.log(e)
    }

}



const getConversations=()=>{ 
    try {
        const socket=new WebSocket("ws://localhost:5001")
         socket.onopen=()=>{
            const data={ 
                method:"conversations",
                user_id:user?.id,
            }
            socket.send(JSON.stringify(data))
            console.log("conversation socket is open")
        }
        socket.onmessage=(event)=>{ 
            const message=JSON.parse(event.data)
            console.log(message)
            switch(message.method){ 
                case "conversations":
                    setConversations(message.conversations)
                    console.log("conversations", conversations)
                    break
                case "new-conversation":
                    setConversations((prevConversations) => [...prevConversations!, message.message])
                    console.log("new conversation", conversations,"here", message.message)
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




const getUserChat=(id:number)=>{ 
    console.log("the functions has been called")
    try{ 
       
        const socket=new WebSocket(`ws://localhost:5001`)
        socket.onopen=()=>{ 
            const data={ 
                method:"chat-connection", 
                conversation_id:id, 
                user_id:user?.id,

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

const createTgBot=async (token:string)=>{
    try{
        const response= await axios.post(`${msgURL}/createbot?user_id=${user?.id}`,{token})
        console.log(response.data)
    }catch(e){
        console.log(e)
    }
}

const clearChat=async (conv_id:string)=>{
    try{ 
        const res=await axios.delete(`${msgURL}/clearchat?conv_id=${conv_id}`)
        if(res){
            getUserChat(parseInt(conv_id))
        }
    }catch(e){
        console.log(e)
    }
}

const removeChat=async (conv_id: string)=> {
    try{
        const res=await axios.delete(`${msgURL}/removechat?conv_id=${conv_id}`)
        console.log(res)
        if(res){
            getConversations()
        }
    }catch(e){
        console.log(e)
    }
}

const getChannels=async()=>{ 
    try{
        const response=await axios.get(`${path}/getchannels?id=${user?.id}`)
        return response.data
    }catch(e){
        console.log(e) 
    }
}




useEffect(()=>{
    console.log("CONVERSATIONS", conversations)
    },[conversations])


useEffect(()=>{ 
    console.log(user,"USER")
},[])
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
                            createTgBot,
                            error, 
                            clearChat,
                            removeChat,
                            
                            getChannels,

                          }}
            >
              {children}
            </StoreContext.Provider>
        
    )

}