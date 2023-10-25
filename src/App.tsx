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









function App() {

  const {checkAuth, isAuth,isLoading}=useStoreContext()
  const {width}=useUIContext()

  useEffect(()=>{

      checkAuth()
      
  
},[])
 
  return <div className="App">
            {isAuth &&
            <BurgerMenu/>
            }
            <Navbar/>
            <div style={{
                marginLeft:isAuth?width:0
            }}>
              <Routes>
                  <Route path="/" element={<Home/>}/>
                  <Route path="/signup"element={<Signup/>}/>
                  <Route path="/login" element={<Login/>}/>
                  <Route path="*" element={<Home/>}/>
                  <Route path="/test" element={<LoadingAnimation/>}/>
                  <Route path="/inbox" element={<Inbox/>}/>
              </Routes>
            </div>
            {isLoading&&<LoadingAnimation/>}
       </div>
  
}

export default App
