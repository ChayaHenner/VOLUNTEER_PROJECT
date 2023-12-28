import React ,{ useState, useEffect, useContext }from 'react'
import { AppContext } from '../../context/context';

const Post = (props) => {
  const post=props.post
  console.log(post);
  console.log(props.profile);
  const { user, setUser } = useContext(AppContext);

  return (
    <div>
      {/* <div class=" bg-gray-100 flex justify-center items-center"> */}
        <div class="p-2 bg-white rounded-xl shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl">
          <div>
            <h1 class="text-2xl mt-2 ml-4 font-bold text-gray-800 cursor-pointer hover:text-gray-900 transition duration-100"> {post.title}</h1>
            <p class="ml-4 mt-1 mb-2 text-gray-700 hover:underline cursor-pointer">{post.description}</p>
          </div>
          <img class="w-full cursor-pointer" src={post.img_url} alt="" />
          <div class="flex p-4 justify-between">
            <div class="flex items-center space-x-2">
              <img class="w-10 rounded-full" src={props.profile} alt="sara" />
              <h2 class="text-gray-800 font-bold cursor-pointer">{user.full_name}</h2>
            </div>
            <div class="flex space-x-2">
              {/* <div class="flex space-x-1 items-center">
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-gray-600 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </span>
                <span>22</span>
              </div> */}
              <div class="flex space-x-1 items-center">
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-red-500 hover:text-red-400 transition duration-100 cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
                  </svg>
                </span>
                <span>likes {post.like_nums}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    // </div>
  )
}

export default Post