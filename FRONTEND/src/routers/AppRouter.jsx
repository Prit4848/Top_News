import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import GetStart from '../screens/GetStart'
import Home from '../screens/Home'
import Login from '../screens/Login'
import Register from '../screens/Register'
import UserProtectedWrapper from '../auth/userProtectedWrapper'


const AppRouter = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<GetStart/>} />
        <Route path='/home' element={<UserProtectedWrapper><Home/></UserProtectedWrapper>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/Register' element={<Register/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default AppRouter