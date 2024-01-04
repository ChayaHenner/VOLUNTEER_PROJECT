import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../context/context';
import { SERVER_URL, apiRequestNoBody } from '../serverConnect/api';
import EditPost from './editPost'; // Import the EditPost component
import { DeleteIcon, EditIcon } from './Icons';

const Post = (props) => {
  const post = props.post;
  // console.log(post);

  const { user } = useContext(AppContext);
  const [like, setLike] = useState(false);
  const [numLike, setNumLike] = useState(post.like_num);
  const [isInitialLoad, setIsInitialLoad] = useState(false);
  const [onClick, setOnClick] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false); // State for managing EditPost popup

  useEffect(() => {
    console.log(post);
    console.log(user);
    post.like_user.forEach(item => {
      console.log(item);
      if (item == user._id) {
        setLike(true);
        setIsInitialLoad(false);
      }
    });
  }, []); // Run once when the component mounts

  useEffect(() => {
    const fetchData = async () => {
      console.log("isInitialLoad", isInitialLoad);
      if (isInitialLoad) {
        // Update the numLike state based on the like state
        // setNumLike((prevNumLike) => (like ? prevNumLike + 1 : prevNumLike - 1));
        if (like) {
          let url = SERVER_URL + `/posts/add/${post._id}`;
          try {
            let resp = await apiRequestNoBody(url, "PUT");
            console.log(resp);
            setNumLike(numLike + 1)
          } catch (err) {
            console.log("ERROR ", err);
          }
          props.getUser()
        } else {
          let url = SERVER_URL + `/posts/decrease/${post._id}`;
          try {
            let resp = await apiRequestNoBody(url, "PUT");
            console.log(resp);
            setNumLike(numLike - 1)
          } catch (err) {
            console.log("ERROR ", err);
          }
          props.getUser()

        }
      } else {
        setIsInitialLoad(true);
      }
      console.log(numLike);
    };

    fetchData(); // Immediately invoke the async function

  }, [onClick]);


  const handleLikeClick = async (id) => {
    setLike((prevLike) => !prevLike);
    setOnClick((prevClick) => !prevClick)
  };

  const handleDeleteClick = async (id) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this post?");
      if (confirmDelete) {
        const url = `${SERVER_URL}/posts/${id}`;
        await apiRequestNoBody(url, "DELETE");
        props.getUser()
        // You may want to refresh the posts list or handle the deleted post in the parent component
      }
    } catch (err) {
      console.error("Error deleting post:", err);
      // Handle the error (e.g., show an error message to the user)
    }
  };
  const handleEditClick = () => {
    setIsEditOpen(true);
  };

  const handleEditClose = () => {
    setIsEditOpen(false);
    props.getUser()
  };

  const handlePostUpdate = (updatedPost) => {
    console.log('Post updated:', updatedPost);
  };

  return (
    <div>
      <div className={`p-2 m-3 bg-white rounded-xl shadow-lg transform transition duration-500 hover:shadow-2xl ${like ? 'border-red-500' : ''}`}>
        <div>
          <h1 className="text-2xl mt-2 ml-4 font-bold text-gray-800 cursor-pointer hover:text-gray-900 transition duration-100"> {post.title}</h1>
        </div>
        <img className="w-full cursor-pointer" src={post.img_url} alt="" />
        <p className="ml-4 mt-1 mb-2 text-gray-700 hover:underline cursor-pointer">{post.description}</p>
        <div className="flex p-4 justify-between">

          <div className="flex space-x-2">

            {user && user._id === post.user_created && (
              <>
                <button onClick={() => handleDeleteClick(post._id)}>
                  <span>
                    <DeleteIcon />
                  </span>
                </button>

                <button onClick={handleEditClick}>

                  <span>
                    <EditIcon />
                  </span>
                </button>
              </>
            )}        </div>

          <div className="flex space-x-1 items-center">
            <button onClick={() => handleLikeClick(post._id)}>
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-7 w-7 ${like ? 'text-red-500 hover:text-red-400' : 'text-gray hover:text-gray-400'} transition duration-100 cursor-pointer`} viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </span>
            </button>
            <span>{numLike}</span>
          </div>
        </div>
        {isEditOpen && (
          <EditPost post={post} onClose={handleEditClose} onUpdate={handlePostUpdate} />
        )}
      </div>
    </div>
  );
};

export default Post;
