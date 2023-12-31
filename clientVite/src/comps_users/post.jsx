import React, { useState, useEffect, useContext } from 'react'
import { AppContext } from '../../context/context';

const Post = (props) => {
  const post = props.post
  const { user, setUser } = useContext(AppContext);

  return (
    <div>
      <div className="p-2 m-3 bg-white rounded-xl shadow-lg transform transition duration-500  hover:shadow-2xl">
        <div>
          <h1 className="text-2xl mt-2 ml-4 font-bold text-gray-800 cursor-pointer hover:text-gray-900 transition duration-100"> {post.title}</h1>
          <p className="ml-4 mt-1 mb-2 text-gray-700 hover:underline cursor-pointer">{post.description}</p>
        </div>
        <img className="w-full cursor-pointer" src={post.img_url} alt="" />
        <div className="flex p-4 justify-between">
          <div className="flex items-center space-x-2">
            <h2 className="text-gray-800 font-bold cursor-pointer">{user.full_name}</h2>
          </div>
          <div className="flex space-x-2">

            <div className="flex space-x-1 items-center">
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-red-500 hover:text-red-400 transition duration-100 cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>

              </span>
              <span>likes {post.like_nums}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post