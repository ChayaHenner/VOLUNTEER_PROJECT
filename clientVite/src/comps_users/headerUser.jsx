import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import LogOut from './logOut'
import ProfileImg from './profileImg';
import { AppContext } from '../../context/context';

// const HeaderUser = () => {
//   const { user } = useContext(AppContext);
//   if (!user) {
//     // If user is not yet available, you can return a loading state or placeholder
//     return <p>Loading...</p>;
//   }

const HeaderUser = () => {
  const { user, setUser } = useContext(AppContext);
  if (!user) {
        // If user is not yet available, you can return a loading state or placeholder
        return <p>Loading...</p>;
      }
  return (
    <header className="bg-white border ">
      <nav className="container mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/">            <h1 className="text-gray-800 text-3xl font-bold">Soulute</h1>
        </Link>
        <ul className="flex space-x-6 text-gray-700 text-lg">
          {
            user ?
              <li>
                {/* Render ProfileImg component if the user is authenticated */}
                <ProfileImg img_url={user.img_url} />
              </li>
              :
              <div></div> 
            }
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
          <li>
            <Link
              to="/my-missions"
              className="hover:text-blue-600 transition duration-300"
            >
              My Missions
            </Link>
          </li>
          <li>
            <Link
              to="/post-mission"
              className="hover:text-blue-600 transition duration-300"
            >
              New Mission
            </Link>
          </li>
          <li>
            <Link
              to="/my-profile"
              className="hover:text-blue-600 transition duration-300"
            >
              My Profile
            </Link>
          </li>
          <li>
            <Link
              to="/view-missions"
              className="hover:text-blue-600 transition duration-300"
            >
              view missions
            </Link>
          </li>



        </ul>


        <LogOut />
      </nav>
    </header>
  );



}


// }

export default HeaderUser