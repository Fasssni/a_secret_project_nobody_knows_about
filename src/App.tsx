import { useState, useEffect} from 'react'
import {Routes, Route} from 'react-router-dom'
import { Home } from './pages/Home'
import { Navbar } from './components/Navbar/Navbar'
import { Signup } from './pages/Signup'
import { Login } from './pages/Login'
import { useStoreContext } from './store/api'
import {LoadingAnimation} from './components/LoadingAnimation/LoadingAnimation'
import { BurgerMenu } from './components/BurgerMenu/BurgerMenu'
import { useUIContext } from './store/uiContext'
import { Inbox } from './pages/Inbox'
import { Integrate } from './pages/Integrate'
import { IntegrationDetailPage } from './pages/IntegrationDetailPage'
import { Automate } from './pages/Automate'









function App() {

  const {checkAuth, isAuth,isLoading}=useStoreContext()
  const {width,closeChatModal, chatModal}=useUIContext()
  
  const appClickHandler=()=>{
    if(chatModal){
      closeChatModal()
    } 

  }



  useEffect(()=>{

      checkAuth()
      
  
},[])

 
  return <div className="App" 
              onClick={appClickHandler}>
            {isAuth &&
            <BurgerMenu/>
            }
            <Navbar/>
            <div style={{
                marginLeft:isAuth?width:0
            }}
            >
              <Routes>
                  <Route path="/" element={<Home/>}/>
                  
                  {isAuth?(
                  <>
                    <Route path="/inbox/" element={<Inbox/>}/>
                    <Route path="/inbox/:conv_id" element={<Inbox/>}/>
                    <Route path="/integrate/" element={<Integrate/>}/>
                    <Route path="/integrate/:integration" element={<IntegrationDetailPage/>}/>
                  </>
                  ):(
                   <>
                      <Route path="/signup"element={<Signup/>}/>
                      <Route path="/login" element={<Login/>}/>
                   </>

                  )}

                  <Route path="*" element={<Home/>}/>
              </Routes>
            </div>
            {isLoading&&<LoadingAnimation/>}
       </div>
  
}

export default App
