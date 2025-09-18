import { Link, useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import UserContext from '../context/UserContext'
import { useContext } from 'react';

const Headermain = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  console.log(user)
  return (
    <>
      <div className="flex w-full justify-between items-center px-8 py-4">
        {/* Centered Logo */}
        <h1 className="text-6xl font-extrabold text-red-500 ml-20">
          Top<span className="text-blue-500">News</span>
        </h1>

        {/* Navigation Links */}
        <div className="flex items-center space-x-8 mr-16">
          {["Home", "About", "ContactUs", "Connect"].map((category, index) => (
            <button
              onClick={() =>
                navigate(`/${category.toLowerCase().replace(/\s+/g, '-')}`)
              }
              key={index}
              className="relative px-6 py-2 text-lg font-semibold text-white transition duration-300 rounded-full hover:bg-red-500 hover:text-white"
            >
              {category}
              <span className="absolute inset-0 border-2 border-red-500 rounded-lg transition-all duration-300 transform scale-100 hover:scale-110"></span>
            </button>
          ))}

          {/* Logout Icon */}
          <Link
            to={'/Logout'}
            title="Logout"
            className="text-white text-2xl hover:text-red-500 transition duration-300"
          >
            <FiLogOut />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Headermain;
