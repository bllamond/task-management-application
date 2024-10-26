import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const isUserSignedIn = !!localStorage.getItem('token');
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="flex justify-between items-center h-[75px] px-8 fixed w-full border-b border-zinc-700 bg-gray-800 text-zinc-100 shadow-md z-50">
      <Link to="/">
        <h1 className="text-2xl md:text-3xl font-bold hover:text-blue-400 transition duration-200">
          Task Management
        </h1>
      </Link>
      <ul className="flex gap-6 md:gap-8 items-center">
        {isUserSignedIn ? (
          <>
            <li>
              <button
                onClick={handleSignOut}
                className="text-xl md:text-2xl hover:text-blue-400 transition duration-200"
              >
                Sign Out
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login" className="text-xl md:text-2xl hover:text-blue-400 transition duration-200">
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" className="text-xl md:text-2xl hover:text-blue-400 transition duration-200">
                SignUp
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Header;
