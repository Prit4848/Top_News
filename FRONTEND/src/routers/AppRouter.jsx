import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import GetStart from '../screens/GetStart'
import Home from '../screens/Home'
import Login from '../screens/Login'
import Register from '../screens/Register'
import UserProtectedWrapper from '../auth/userProtectedWrapper'
import ReadMore from '../screens/ReadMore'
import  ContactUs  from '../screens/ContactUs'
import ConnectPage from '../screens/Connect'
import AboutPage from '../screens/About'


const AppRouter = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<GetStart/>} />
        <Route path='/home' element={<UserProtectedWrapper><Home/></UserProtectedWrapper>} />
        <Route path='/home/readmore' element={<UserProtectedWrapper><ReadMore/></UserProtectedWrapper>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/Register' element={<Register/>} />
        <Route path='/ContactUs' element={<ContactUs/>} />
        <Route path='/Connect' element={<ConnectPage/>} />
        <Route path='/About' element={<AboutPage/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default AppRouter