import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import LogOut from './logOut';
import { AppContext } from '../../context/context';
import ProfileImg from './profileImg';
import Cookies from 'js-cookie';

const HeaderUser = () => {
  const { user, setUser } = useContext(AppContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // useEffect(() => {
  //   const userFromCookie = Cookies.get('user');
  //   if (userFromCookie) {
  //     const parsedUser = JSON.parse(userFromCookie);
  //     setUser(parsedUser);
  //   }
  // }, []);
  useEffect(() => {
    const userCookie = Cookies.get('user');
    if (userCookie) {
      setUser(JSON.parse(userCookie));
    }
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [setUser]);


  const handleProfileClick = () => {
    setDropdownOpen((prevOpen) => !prevOpen);
  };

  const handleLogout = () => {
    setUser(null);
    setDropdownOpen(false);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  return (
    <header className="bg-white border ">
      <nav className="container mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/">
          <h1 className="text-gray-800 text-3xl font-bold">Soulute</h1>
        </Link>

        <ul className="flex space-x-6 text-gray-700 text-lg">
          <li>
            <Link to="/login" className="hover:text-blue-600 transition duration-300">
              Login
            </Link>
          </li>
          <li>
            <Link to="/sign-up" className="hover:text-blue-600 transition duration-300">
              Sign Up
            </Link>
          </li>
          {
            console.log(Cookies.get('token'))
          }
          {user && (

            <><li>
              <Link to="/my-missions" className="hover:text-blue-600 transition duration-300">
                My Missions
              </Link>
            </li><li>
                <Link to="/post-mission" className="hover:text-blue-600 transition duration-300">
                  New Mission
                </Link>
              </li><li>
                <Link to="/view-missions" className="hover:text-blue-600 transition duration-300">
                  view missions
                </Link>
              </li></>
          )}
          {
            console.log(user)
          }
          {user && user.role === 'admin' && (
            <li>
              <Link to="/ViewUser-Admin" className="hover:text-blue-600 transition duration-300">
                view user
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