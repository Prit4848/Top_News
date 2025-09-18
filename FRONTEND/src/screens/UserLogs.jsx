import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Admin from "./Admin";

const UserLogs = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLogs = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/user/logs`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setUsers(response.data.users || []);
      setLoading(false);
    } catch (error) {
      console.error(error.message);
      toast.error("❌ Failed to fetch user logs");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <>
     <Admin/>
      <ToastContainer position="top-right" />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6">
        <div className="w-full max-w-5xl bg-white dark:bg-slate-800 shadow-2xl rounded-3xl p-10 relative overflow-x-auto">
          {/* Logout Icon */}
          <Link
            to="/Logout"
            title="Logout"
            className="absolute top-6 right-6 text-slate-600 dark:text-slate-300 text-2xl hover:text-red-500 transition duration-300"
          >
            <FiLogOut />
          </Link>

          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 border-b-2 pb-4">
            📊 Admin Panel – Users
          </h2>

          {loading ? (
            <p className="text-center text-lg text-slate-500 dark:text-slate-300">
              Loading users...
            </p>
          ) : users.length === 0 ? (
            <p className="text-center text-lg text-slate-500 dark:text-slate-300">
              No users found
            </p>
          ) : (
            <table className="w-full border-collapse text-left text-sm md:text-base">
              <thead>
                <tr className="bg-slate-200 dark:bg-slate-700">
                  <th className="p-4">#</th>
                  <th className="p-4">First Name</th>
                  <th className="p-4">Last Name</th>
                  <th className="p-4">Email</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, i) => (
                  <tr
                    key={user._id}
                    className="border-b border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700"
                  >
                    <td className="p-4">{i + 1}</td>
                    <td className="p-4">{user.name?.firstname || "-"}</td>
                    <td className="p-4">{user.name?.lastname || "-"}</td>
                    <td className="p-4">{user.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default UserLogs;
