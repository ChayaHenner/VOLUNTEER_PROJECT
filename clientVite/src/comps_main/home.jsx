import React from 'react'
import Cookies from 'js-cookie';

const Home = () => {
  const cookieValue = Cookies.get('token');
  const user = JSON.parse(Cookies.get('user'));
  console.log('user value:', user); // Log the value to the console

  return (
    <div className="">
      <h2>your token {cookieValue}</h2>
      <h2>your user {user && user.full_name}</h2>
    <div>Home</div></div>
  )
}

export default Home