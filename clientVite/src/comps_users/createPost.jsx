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
        <div className="mb-4 px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Title:</label>
          <input {...register('title', { required: true })} type="text" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-purple-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" />
          {errors.title && <div className="text-red-500 text-xs italic">Title is required</div>}
        </div>
        <div className="mb-4 px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Description:</label>
          <textarea {...register('description', { required: true })} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-purple-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" />
          {errors.description && <div className="text-red-500 text-xs italic">Description is required</div>}
        </div>
        <div className="mb-4 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Profile Image:</label>
            <input {...register('img_url')} type="file" accept="image/*" onChange={(e) => setSelectedImage(e.target.files[0])} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-purple-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"/>
          </div>

        <button type="submit" className="bg-purple-500 text-white px-4 py-2 rounded-md mt-4">Create Post</button>
      </form>
    </div>
  );
};

export default CreatePost;
