import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import LogOut from './logOut';
import { AppContext } from '../../context/context';
import ProfileImg from './profileImg';
import Cookies from 'js-cookie';
import DeletUser from './deletUser';

const HeaderUser = () => {
  const { user, setUser } = useContext(AppContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const userCookie = Cookies.get('user');
    if (userCookie) {
      setUser(JSON.parse(userCookie));
    }
  }, []);

  const handleProfileClick = () => {
    setDropdownOpen((prevOpen) => !prevOpen);
  };

  const handleLogout = () => {
    setUser(null);
    setDropdownOpen(false);
  };

  const handleDelet = () => {
    setUser(null);
    setDropdownOpen(false);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  return (
    <header className="bg-white border">
      <nav className="container mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/">
          <h1 className="text-gray-800 text-3xl font-bold">Soulute</h1>
        </Link>

        <ul className="flex space-x-6 text-gray-700 text-lg">
          {!user && (
            <li>
              <Link to="/login" className="hover:text-blue-600 transition duration-300">
                Login
              </Link>
            </li>
          )}
          {!user && (
            <li>
              <Link to="/sign-up" className="hover:text-blue-600 transition duration-300">
                Sign Up
              </Link>
            </li>
          )}
          {user && (
            <>
              <li>
                <Link to="/my-missions" className="hover:text-blue-600 transition duration-300">
                  My Missions
                </Link>
              </li>
              <li>
                <Link to="/view-missions" className="hover:text-blue-600 transition duration-300">
                  View Missions
                </Link>
              </li>
            </>
          )}
          {user && user.role === 'admin' && (
            <li>
              <Link to="/ViewUser-Admin" className="hover:text-blue-600 transition duration-300">
                View User
              </Link>
            </li>
          )}
          {user && user.role === 'admin' && (
            <li>
              <Link to="/management" className="hover:text-blue-600 transition duration-300">
                Management
              </Link>
            </li>
          )}
          {user && (
            <li className="relative">
              <button onClick={handleProfileClick} className="focus:outline-none">
                <ProfileImg img_url={user.img_url} />
              </button>
              {dropdownOpen && (
                <ul className="z-10 absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
                  <li>
                    <Link
                      to="/my-profile"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                      onClick={closeDropdown}
                    >
                      My Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                      onClick={handleLogout}
                    >
                      <LogOut />
                    </button>
                    <button
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                      onClick={handleDelet}
                    >
                      <DeletUser />
                    </button>
                  </li>
                </ul>
              )}
            </li>
          )}
        </ul>

      </nav>
    </header>
  );
};

export default HeaderUser;
