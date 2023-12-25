import React from 'react'
import Cookies from 'js-cookie';

const Home = () => {
  const cookieValue = Cookies.get('token');
  console.log('Token value:', cookieValue); // Log the value to the console

  return (
    <div className="">
      <h2>your token {cookieValue}</h2>
    <div>Home</div></div>
  )
}

export default Home