import { useState } from 'react'
import { Route,Routes,BrowserRouter } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Add from './pages/Add'
import Signup from './pages/Signup';
import SignInForm from './pages/Signin';

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SignInForm></SignInForm>}></Route>
          <Route path='/signup' element={<Signup></Signup>}></Route>
          <Route path='home' element={<Home></Home>}></Route>
          <Route path='/task' element={<Add></Add>}></Route>   
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
