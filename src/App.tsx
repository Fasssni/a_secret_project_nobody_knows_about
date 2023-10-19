import { useState, useEffect} from 'react'
import {Routes, Route} from 'react-router-dom'
import { Home } from './pages/Home'
import { Navbar } from './components/Navbar/Navbar'
import { Signup } from './pages/Signup'
import { Login } from './pages/Login'







function App() {
 
  return <div className="App">
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/signup"element={<Signup/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="*" element={<Home/>}/>
            </Routes>
       </div>
  
}

export default App
