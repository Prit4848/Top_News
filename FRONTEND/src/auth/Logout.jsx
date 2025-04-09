import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Logout = ({children}) => {
    const token = localStorage.getItem("token")
    const navigate = useNavigate()

    useEffect(() => {
        if(!token){
           return navigate('/Login')
        }
      const featchLogout = async()=>{
        await axios.get(`${import.meta.env.VITE_BASE_URL}/user/logout`,{ headers: { Authorization: `Bearer ${token}` }})
        .then((response)=>{
          if(response.status == 200 || response.status == 201){
            localStorage.removeItem("token")
            navigate('/Login')
          }
        })
      }
      featchLogout()
    }, [token,navigate])
    
  return (
    <div>{children}</div>
  )
}

export default Logout