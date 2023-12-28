import React from 'react';
// import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';

const Logout = () => {
//   const history = useHistory();

  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('user');

    // history.push('/');
  };

  return (
    <div>
      <button className='bg-purple-500 text-white px-4 py-2 rounded-md mt-4' onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
