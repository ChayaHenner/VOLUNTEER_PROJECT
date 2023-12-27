import React from 'react'
import { useForm } from 'react-hook-form';
import { fieldsEnum, SERVER_URL, apiRequest } from '../serverConnect/api';
import Cookies from 'js-cookie';

const PostMission = () => {
  const { register, handleSubmit, formState: { errors }, getValues } = useForm();
  
  const onSubPost = async(data) => {
    console.log(data)
    let url = SERVER_URL+"/missions/"
    try {
      let resp = await apiRequest(url, "POST", data)
      console.log("mission added")
    }
    catch (err) {
      console.log("ERROR ",err);
    }
  }
  
  return (
    <div className="">
      <div>Create Mission</div>
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
          <label className="block text-sm font-medium text-gray-700">Address:</label>
          <input {...register('address')} type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Date:</label>
          <input {...register('date', { required: true })} type="date" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
          {errors.date && <div className="text-red-500 text-xs">Date is required</div>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Time:</label>
          <input {...register('time', { required: true })} type="time" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
          {errors.time && <div className="text-red-500 text-xs">Time is required</div>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Minimum Age Requirement:</label>
          <input {...register('requirements.min_age', { required: true })} type="number" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
          {errors['requirements.min_age'] && <div className="text-red-500 text-xs">Minimum age requirement is required</div>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Maximum Age Requirement:</label>
          <input {...register('requirements.max_age', { required: true })} type="number" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
          {errors['requirements.max_age'] && <div className="text-red-500 text-xs">Maximum age requirement is required</div>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Gender:
          </label>
          <div className="mt-1">
            <label className="inline-flex items-center">
              <input {...register('requirements.gender', { required: true })} type="radio" value="male" className="form-radio h-4 w-4 text-indigo-600" />
              <span className="ml-2">Male</span>
            </label>
            <label className="inline-flex items-center ml-6">
              <input {...register('requirements.gender', { required: true })} type="radio" value="female" className="form-radio h-4 w-4 text-indigo-600" />
              <span className="ml-2">Female</span>
            </label>
          </div>
          {errors['requirements.gender'] && <div className="text-red-500 text-xs">Gender is required</div>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Interests:
          </label>
          <div className="mt-1">
            {fieldsEnum.map((field) => (
              <label key={field} className="inline-flex items-center mr-4">
                <input
                  type="checkbox"
                  value={field}
                  className="form-checkbox h-4 w-4 text-indigo-600"
                  {...register('fields')} // Include selected fields in register
                />
                <span className="ml-2">{field}</span>
              </label>
            ))}
          </div>
        </div>        <button type="submit" className="bg-purple-500 text-white px-4 py-2 rounded-md mt-4">Create Mission</button>
      </form>
    </div>
  );
}

export default PostMission