import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { tokenExpireAlert, fieldsEnum, SERVER_URL, apiRequest } from '../serverConnect/api';
import Cookies from 'js-cookie';
import AddressInput from './addressInput';

const PostMission = ({ setShowCreateNewMission }) => {
  const { register, handleSubmit, formState: { errors }, getValues } = useForm();
  const [address, setAddress] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const nav = useNavigate();

  const categoryColors = {
    children: 'bg-blue-200',
    kitchen: 'bg-green-200',
    driving: 'bg-yellow-200',
    elderly: 'bg-green-500',
    cleanup: 'bg-pink-200',
    studies: 'bg-purple-200',
    medical: 'bg-red-200',
    technology: 'bg-indigo-200',
  };

  const handleCategoryClick = (category) => {
    setSelectedCategories((prevSelected) => {
      if (prevSelected.includes(category)) {
        return prevSelected.filter((item) => item !== category);
      } else {
        // Category is not selected, add it
        return [...prevSelected, category];
      }
    });
  };

  const isCategorySelected = (category) => {
    return selectedCategories.includes(category);
  };

  const onSubPost = async (data) => {
    data.address = address; // new
    console.log(data);
    let url = SERVER_URL + '/missions/';
    try {
      let resp = await apiRequest(url, 'POST', data);
      console.log('mission added');
      setShowCreateNewMission(false);
    } catch (err) {
      tokenExpireAlert(err);
      console.log('ERROR ', err);
    }
  };

  return (
    <div className="fixed w-1/2 top-0 left-0 z-50 w-full h-full flex justify-center items-center bg-gray-200 bg-opacity-50 backdrop-filter backdrop-blur-md">
      <form onSubmit={handleSubmit(onSubPost)} className="mt-3">
        {/* ... other form fields ... */}

        <div className="mb-4 px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Interests:
          </label>
          <div className="mt-1 flex">
            {fieldsEnum.map((field) => (
              <label
                key={field}
                className={`inline-flex items-center mr-4  cursor-pointer ${isCategorySelected(field) ? 'selected-category' : ''
                  }`}
                onClick={() => handleCategoryClick(field)}
              >
                <input
                  type="checkbox"
                  value={field}
                  className="hidden"
                  {...register('fields')}
                />
                <div
                  className={`rounded-md px-2 py-1 ${categoryColors[field.toLowerCase()] || 'bg-gray-200'
                    } ${isCategorySelected(field) ? 'border-black' : ''}`}
                >
                  {field}
                </div>
              </label>
            ))}
          </div>
        </div>

        <button type="submit" className="m-2 bg-purple-500 text-white px-4 py-2 rounded-md mt-4">
          Create Mission
        </button>
        <button
          type="button"
          className="m-2 text-purple-500 px-4 py-2 rounded-md mt-4"
          onClick={() => setShowCreateNewMission(false)}
        >
          Close
        </button>
      </form>
    </div>
  );
};

export default PostMission;
