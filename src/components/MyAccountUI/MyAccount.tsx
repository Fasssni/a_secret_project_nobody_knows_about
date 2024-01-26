import { useStoreContext } from "../../store/api"
import cl from "./MyAccount.module.css"

type MyAccountUIType={ 
     handleMyAccountModal:(e:React.MouseEvent<HTMLDivElement, MouseEvent>)=>void, 
     myAccountModal: boolean,
}
export const MyAccountUI=({handleMyAccountModal,myAccountModal}:MyAccountUIType)=>{ 

   const {user, logout}= useStoreContext()
   
   return <div className={cl.my_account}
                onClick={(e:React.MouseEvent<HTMLDivElement, MouseEvent>)=>handleMyAccountModal(e)}>
                
                <img className={cl.icon}
                     src="https://i.pinimg.com/736x/f7/42/15/f74215072cc76a6945b6634283f72662.jpg"
                     >
                </img>
     
                <p>{user?.name}</p>
                {
                myAccountModal&&<div className={cl.myaccount_modal}>
                                   <a href="/home" className={cl.modalmenu_element}>My account</a>
                                   <a href="/home" className={cl.modalmenu_element}>Settings</a>
                                   <div className={cl.modal_line}></div>
                                   <a onClick={()=>logout()} className={cl.modalmenu_element}>Logout</a>
                                </div>
                                }
                
           </div>
}