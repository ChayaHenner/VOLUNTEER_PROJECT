import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { SERVER_URL, apiRequest } from '../serverConnect/api';
import Cookies from 'js-cookie';
import { uploadImageToStorage } from '../helper/helper';

const CreatePost = (props) => {
  const { register, handleSubmit, formState: { errors }, getValues } = useForm();
  const [selectedImage, setSelectedImage] = useState(null);

  const onSubPost = async (data) => {
    const imageUrl = await uploadImageToStorage(selectedImage);
    data.img_url = imageUrl;
    console.log(data);
    let url = SERVER_URL + "/posts/";
    try {
      let resp = await apiRequest(url, "POST", data);
      console.log("post added");
      props.setShowCreatePost(false)
      props.getUser()
    } catch (err) {
      console.log("ERROR ", err);
    }
    setShowCreatePost()
    props.getUser()
  };

  return (
    <div className="fixed w-1/2 top-0 left-0 z-50 w-full h-full flex justify-center items-center bg-gray-200 bg-opacity-50 backdrop-filter backdrop-blur-md">
      {/* <div className="bg-white p-6 rounded-lg shadow-lg"> */}
      {/* <button className="absolute top-2 right-2 text-gray-600 text-7xl" >
          close
        </button> */}

      <div className=" p-2 m-2">
        <div className=''>Create Post</div>
        <form onSubmit={handleSubmit(onSubPost)} className="mt-3">
          <div className="mb-4 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Title:</label>
            <input {...register('title', { required: true })} type="text" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-purple-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" />
          </div>
          <div className="mb-4 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Description:</label>
            <textarea {...register('description', { required: true })} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-purple-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" />
          </div>
          <div className="mb-4 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Profile Image:</label>
            <input {...register('img_url')} type="file" accept="image/*" onChange={(e) => setSelectedImage(e.target.files[0])} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-purple-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" />
          </div>

          <button type="submit" className="bg-purple-500 text-white px-4 py-2 rounded-md mt-4">Create Post</button>
          <button type="button" className="outline-purple-500 text-purple-500 px-4 py-2 rounded-md mt-4" onClick={() => { props.setShowCreatePost(false) }}>close</button>
        </form>
      </div>
      {/* </div> */}
    </div>

  );
};

export default CreatePost;
