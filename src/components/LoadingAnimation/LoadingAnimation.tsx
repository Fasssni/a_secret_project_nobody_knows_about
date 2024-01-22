
import { MoonLoader } from 'react-spinners'
import cl from "./LoadingAnimation.module.css"
import { useStoreContext } from '../../store/api';


export const LoadingAnimation = () => {  
    

    return <div className={cl.main}>
             <MoonLoader size={40}   cssOverride={{position:'absolute'}}/>
         </div>
}

