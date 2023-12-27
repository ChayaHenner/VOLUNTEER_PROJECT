import React from 'react';
import { useForm } from 'react-hook-form';
import { SERVER_URL, apiRequest } from '../serverConnect/api';
import Cookies from 'js-cookie';

const CreatePost = () => {
  const { register, handleSubmit, formState: { errors }, getValues } = useForm();

  const onSubPost = async(data) => {
    console.log(data);
    // let url = SERVER_URL + "/posts/";
    // try {
    //   let resp = await apiRequest(url, "POST", data);
    //   console.log("mission added");
    // } catch (err) {
    //   console.log("ERROR ", err);
    // }
  };

  return (
    <div className="border p-2 m-2">
      <div className=''>Create Post</div>
      <form onSubmit={handleSubmit(onSubPost)} className="mt-3">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Title:</label>
          <input {...register('title', { required: true })} type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
          {errors.title && <div className="text-red-500 text-xs">Title is required</div>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Description:</label>
          <textarea {...register('description', { required: true })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
          {errors.description && <div className="text-red-500 text-xs">Description is required</div>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Image Input:</label>
          <input {...register('image', { required: true })} type="file" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
          {errors.image && <div className="text-red-500 text-xs">Image is required</div>}
        </div>
        <button type="submit" className="bg-purple-500 text-white px-4 py-2 rounded-md mt-4">Create Post</button>
      </form>
    </div>
  );
};

export default CreatePost;
