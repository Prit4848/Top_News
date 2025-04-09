import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import GetStart from '../screens/GetStart'
import Home from '../screens/Home'
import Login from '../screens/Login'
import Register from '../screens/Register'
import ReadMore from '../screens/ReadMore'
import  ContactUs  from '../screens/ContactUs'
import ConnectPage from '../screens/Connect'
import AboutPage from '../screens/About'
import Admin from '../screens/Admin'
import AdminProtectedWrapper from '../auth/AdminProtectedWrapper'
import UserProtectedWrapper from '../auth/UserProtectedWrapper'
import Logout from '../auth/Logout'


const AppRouter = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<GetStart/>} />
        <Route path='/home' element={<UserProtectedWrapper><Home/></UserProtectedWrapper>} />
        <Route path='/home/readmore' element={<UserProtectedWrapper><ReadMore/></UserProtectedWrapper>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/Logout' element={<Logout/>} />
        <Route path='/Register' element={<Register/>} />
        <Route path='/ContactUs' element={<ContactUs/>} />
        <Route path='/Connect' element={<ConnectPage/>} />
        <Route path='/About' element={<AboutPage/>} />
        <Route path='/Admin' element={<AdminProtectedWrapper><Admin/></AdminProtectedWrapper>} />
    </Routes>
    </BrowserRouter>
  )
}

export default AppRouter