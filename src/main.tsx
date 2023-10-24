import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

import {BrowserRouter} from "react-router-dom"
import { StoreContextProvider } from './store/api.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(

   <StoreContextProvider>    
      <BrowserRouter>
        <App />
      </BrowserRouter>
  </StoreContextProvider> 
  
)
