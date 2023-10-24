import React from 'react';
import { RotateLoader, MoonLoader } from 'react-spinners'
import cl from "./LoadingAnimation.module.css"
import { useStoreContext } from '../../store/api';


export const LoadingAnimation = () => {  
    
    const {isLoading}=useStoreContext()
    return <div className={cl.main}>
             <MoonLoader size={40}   cssOverride={{position:'absolute'}}/>
         </div>
}

