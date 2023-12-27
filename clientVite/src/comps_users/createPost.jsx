import React ,{useState} from 'react';
import { useForm } from 'react-hook-form';
import { SERVER_URL, apiRequest } from '../serverConnect/api';
import Cookies from 'js-cookie';
import { uploadImageToStorage } from '../helper/helper';

const CreatePost = () => {
  const { register, handleSubmit, formState: { errors }, getValues } = useForm();
  const [selectedImage, setSelectedImage] = useState(null);

  const onSubPost = async(data) => {
    const imageUrl = await uploadImageToStorage(selectedImage);
    data.img_url = imageUrl;

    console.log(data);
    let url = SERVER_URL + "/posts/";
    try {
      let resp = await apiRequest(url, "POST", data);
      console.log("post added");
    } catch (err) {
      console.log("ERROR ", err);
    }
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
            <label className="block text-sm font-medium text-gray-700">
              Profile Image:</label>
            <input {...register('img_url')} type="file" accept="image/*" onChange={(e) => setSelectedImage(e.target.files[0])} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"/>
            {/* <input {...register('img_url')} type="file" accept="image/*" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" /> */}
          </div>

        <button type="submit" className="bg-purple-500 text-white px-4 py-2 rounded-md mt-4">Create Post</button>
      </form>
    </div>
  );
};

export default CreatePost;
