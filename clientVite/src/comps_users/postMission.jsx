import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { tokenExpireAlert, fieldsEnum, SERVER_URL, apiRequest } from '../serverConnect/api';
import Cookies from 'js-cookie';
import AddressInput from './addressInput'


const PostMission = ({ setShowCreateNewMission }) => {
  const { register, handleSubmit, formState: { errors }, getValues } = useForm();
  const [address, setAddress] = useState(null);
  const nav = useNavigate()
  const [coordinates, setCoordinates] = useState({ lat: '', lon: '' });


  const onSubPost = async (data) => {
    const { lat, lon } = coordinates;
    const mapLink = `https://maps.google.com/maps?q=${lat},${lon}&hl=hw&z=14&amp;output=embed`;
    const add = {
      name: address,
      mapLink: mapLink
    }
    console.log('Map Link:', mapLink);
    data.address = add;

    console.log(data)
    let url = SERVER_URL + "/missions/"
    try {
      let resp = await apiRequest(url, "POST", data)
      console.log("mission added")
      setShowCreateNewMission(false)
    }
    catch (err) {
      tokenExpireAlert(err)
      console.log("ERROR ", err);
    }
  }

  return (
    <div className="fixed w-1/2 top-0 left-0 z-50 w-full h-full flex justify-center items-center bg-gray-200 bg-opacity-50 backdrop-filter backdrop-blur-md">
      <form onSubmit={handleSubmit(onSubPost)} className="mt-3">
        <div className="w-1/3 mb-4 px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Title:</label>
          <input {...register('title', { required: true })} type="text" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-purple-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" />
          {errors.title && <div className="text-red-500 text-xs italic">Title is required</div>}
        </div>
        <div className="mb-4 px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Description:</label>
          <textarea {...register('description', { required: true })} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-purple-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" />
          {errors.description && <div className="text-red-500 text-xs italic">Description is required</div>}
        </div>
        <div className='flex'>
          <div className="mb-4 px-3 w-1/3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Address:</label>

            {/* <input {...register('address')} type="text" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-purple-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" />
            {errors.address && <div className="text-red-500 text-xs italic">choose valid address</div>} */}
            <AddressInput setAddress={setAddress} setCoordinates={setCoordinates} />
            {/* <AddressInput {...register('address')} onAddressSelected={(address) => setSelectedAddress(address.description)} /> */}

          </div>

          <div className="w-1/3 mb-4 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Date:</label>
            <input {...register('date', { required: true })} type="date" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-purple-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" />
            {errors.date && <div className="text-red-500 text-xs italic">Date is required</div>}
          </div>
          <div className="w-1/3 mb-4 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Time:</label>
            <input {...register('time', { required: true })} type="time" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-purple-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" />
            {errors.time && <div className="text-red-500 text-xs italic">Time is required</div>}
          </div>
        </div>
        <div className='flex'>

          <div className="mb-4 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Minimum Age Requirement:</label>
            <input {...register('requirements.min_age', { required: true })} type="number" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-purple-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" />
            {errors['requirements.min_age'] && <div className="text-red-500 text-xs italic">Minimum age requirement is required</div>}
          </div>
          <div className="mb-4 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Maximum Age Requirement:</label>
            <input {...register('requirements.max_age', { required: true })} type="number" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-purple-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" />
            {errors['requirements.max_age'] && <div className="text-red-500 text-xs italic">Maximum age requirement is required</div>}
          </div>
          <div className="mb-4 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Gender:
            </label>
            <div className="mt-1">
              <label className="inline-flex items-center">
                <input {...register('requirements.gender')} type="radio" value="male" className="form-radio h-4 w-4 text-indigo-600" />
                <span className="ml-2">Male</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input {...register('requirements.gender')} type="radio" value="female" className="form-radio h-4 w-4 text-indigo-600" />
                <span className="ml-2">Female</span>
              </label>
            </div>
            {errors['requirements.gender'] && <div className="text-red-500 text-xs italic">Gender is required</div>}
          </div>
        </div>
        <div className="mb-4 px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
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
        </div>        <button type="submit" className="m-2 bg-purple-500 text-white px-4 py-2 rounded-md mt-4">Create Mission</button>
        <button type="button" className=" m-2 bg-purple-500 text-white px-4 py-2 rounded-md mt-4" onClick={() => { setShowCreateNewMission(false) }}>close</button>
      </form>
    </div>
  );
}

export default PostMission