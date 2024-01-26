import { HomePage } from "../LandingPages/HomePage"
import "../main.css"
import { useStoreContext } from "../store/api"


export const Home=()=>{

    const {isAuth, user}=useStoreContext()
    

    return( 
    <>
     {isAuth
            ?
      <div className="home">
   
        <div className="userAccount">
            <h3>{user?.name}</h3>
            <h3>{user?.surname}</h3>
            <p>{user?.email}</p>

        </div>
     </div>
        : <HomePage/>
          
        }
    </>
     
    )
}