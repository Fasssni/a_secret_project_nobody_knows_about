import { useState, useEffect} from 'react'
import {Routes, Route} from 'react-router-dom'
import { Home } from './pages/Home'
import { Navbar } from './components/Navbar/Navbar'
import { Signup } from './pages/Signup'
import { Login } from './pages/Login'
import { useStoreContext } from './store/api'
import {LoadingAnimation} from './components/LoadingAnimation/LoadingAnimation'








function App() {

  const {checkAuth, user,isLoading}=useStoreContext()

  useEffect(()=>{

      checkAuth()
      
  
},[])
 
  return <div className="App">
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/signup"element={<Signup/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="*" element={<Home/>}/>
                <Route path="/test" element={<LoadingAnimation/>}/>
                
            </Routes>
            {isLoading&&<LoadingAnimation/>}
       </div>
  
}

export default App
