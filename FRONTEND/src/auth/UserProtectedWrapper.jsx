import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserProtectedWrapper = ({ children }) => {
  const [isLoggedin, setIsLoggedin] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token"); // Retrieve token inside useEffect

    if (!token) {
      navigate("/login");
      return;
    }

    const UserProtectionHandler = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200 || response.status === 201) {
          setIsLoggedin(false);
        }
      } catch (error) {
        console.error("Authentication Error:", error);
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    UserProtectionHandler();
  }, []);

  if (isLoggedin) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default UserProtectedWrapper;
