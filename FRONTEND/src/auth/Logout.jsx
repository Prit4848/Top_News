import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      return navigate("/Login");
    }
    const fetchLogout = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/user/logout`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.status === 200 || response.status === 201) {
          console.log("Logout successful");
        }
      } catch (error) {
        console.error("Logout failed:", error.response?.data || error.message);
      } finally {
        localStorage.removeItem("token");
        navigate("/Login");
      }
    };

    fetchLogout();
  }, [token, navigate]);

  return <div>{children}</div>;
};

export default Logout;
