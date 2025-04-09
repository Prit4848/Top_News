import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AdminProtectedWrapper = ({children}) => {
    const [isLoggedin, setisLoggedin] = useState(true)
    const navigate = useNavigate()
    
    useEffect(() => {
      const token = localStorage.getItem("token")

      if(!token){
        navigate('/Login')
        return;
      }
    
      const getProfile = async ()=>{
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/profile`,
                {headers:{Authorization:`Bearer ${token}`}}
            )
            if(response.status == 200 || response.status == 201){
                setisLoggedin(false)
            }

        } catch (error) {
        console.error("Authentication Error:", error);
        localStorage.removeItem("token");
        navigate("/login");
        }
      }
      getProfile()
    }, [])

    if(isLoggedin){
        return <div>Loading...</div>
    }
    

  return (
    <>{children}</>
  )
}

export default AdminProtectedWrapper