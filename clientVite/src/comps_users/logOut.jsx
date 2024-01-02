import React from 'react';
// import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';


const Logout = () => {
const nav = useNavigate()

  const handleLogout = () => {
    console.log("logout");
    Cookies.remove('token');
    Cookies.remove('user');
    nav("/")

  };

  return (
    <div>
      <button className='bg-purple-500 text-white px-4 py-2 rounded-md mt-4' onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
