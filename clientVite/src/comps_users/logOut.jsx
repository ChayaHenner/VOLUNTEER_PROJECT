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
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
