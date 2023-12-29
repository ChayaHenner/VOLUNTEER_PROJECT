import React from 'react';
import StarIcon from './starIcon'
const Review = ({ review }) => {
  return (
    <div className=" p-4 m-1 border-b">
      <div className="flex  mb-4">
        <img className="w-10 h-10 me-4 rounded-full" src="/docs/images/people/profile-picture-5.jpg" alt="" />
        <div className="font-medium dark:text-white">
          <p>user_creator {review.user_creator} <time className="block text-sm text-gray-500 dark:text-gray-400"></time></p>
        </div>
      </div>
      <div className="flex  mb-1 space-x-1 rtl:space-x-reverse">
        <h3 className="ms-2 text-sm  text-gray-300 dark:text-white">{review.rating}</h3>
        <h3 className="ms-2 text-sm font-semibold text-gray-900 dark:text-white">{review.title}</h3>
      </div>
      <p className="mb-2 text-left text-gray-500 dark:text-gray-400 rtl:space-x-reverse">{review.description}</p>
      <StarIcon rating={review.rating > 0 ? review.rating : 0} />
    </div>
  );
};

export default Review;
