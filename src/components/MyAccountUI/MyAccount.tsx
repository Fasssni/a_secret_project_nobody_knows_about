import { useStoreContext } from "../../store/api"
import cl from "./MyAccount.module.css"
export const MyAccountUI=()=>{ 

   const {user, logout}= useStoreContext()
   
   return <div className={cl.my_account}
                onClick={()=>logout()}>
                
                <img className={cl.icon}
                     src="https://i.pinimg.com/736x/f7/42/15/f74215072cc76a6945b6634283f72662.jpg"
                     >
                </img>
     
                <p>{user?.name}</p>
                
           </div>
}