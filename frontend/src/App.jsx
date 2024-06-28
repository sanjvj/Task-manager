import { useState } from 'react'
import { Route,Routes,BrowserRouter } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Add from './pages/Add'

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path='/task' element={<Add></Add>}></Route>   
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
