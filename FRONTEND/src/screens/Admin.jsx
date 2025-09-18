import { Link } from "react-router-dom";


const Admin = () => {
  return (
    
      <nav className="p-6 flex justify-center gap-6 bg-slate-800 shadow-md">
        <Link
          to="/sendupdates"
          className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition"
        >
          🚀 Send Updates
        </Link>
        <Link
          to="/logs"
          className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition"
        >
          📊 User Logs
        </Link>
      </nav>
  );
};

export default Admin;
