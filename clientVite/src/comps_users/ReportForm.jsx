import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { SERVER_URL, apiRequest } from '../serverConnect/api';
import Cookies from 'js-cookie';
import StarReview from './starReview';
import { uploadImageToStorage } from '../helper/helper';

const ReportForm = ({ id }) => {
//   const [ratingValue, setRatingValue] = useState(3.5);
  const { register, handleSubmit, formState: { errors }, getValues } = useForm();
//   const [selectedImage, setSelectedImage] = useState(null);
  const [submitted, setSubmitted] = useState(false); // Track if the form has been submitted

  const onSubPost = async (data) => {
    console.log(data);

    let url = SERVER_URL + `/users/report/${id}`; // Add id
    try {
      let resp = await apiRequest(url, "POST", data);
      console.log("report added");
      setSubmitted(true); // Set submitted to true after successful submission
    } catch (err) {
      console.log("ERROR ", err);
    }
  };

  return (
    <div className="bg-white shadow p-4 py-8">
      <div className="heading text-center font-bold text-2xl m-5 text-gray-800 bg-white">Write report</div>
      {!submitted ? (
        <form onSubmit={handleSubmit(onSubPost)} className="mt-3">
          <div className="editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl">
            <textarea {...register('Message', { required: true })} className="bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none" spellCheck="false" placeholder="Write the reason why you want to block"></textarea>
            <div className="icons flex text-gray-500 m-2">
              <div className="count ml-auto text-gray-400 text-xs font-semibold">0/300</div>
            </div>
            <div id="preview" className="my-4 flex">
            </div>
            <button type="submit" className="bg-purple-500 text-white px-4 py-2 rounded-md mt-4">Submit</button>
          </div>
        </form>
      ) : (
        <p className="text-green-500 text-center mt-4">Report submitted successfully!</p>
      )}
    </div>
  );
}

export default ReportForm;
