import React from 'react';
import StarIcon from './starIcon'
const Review = ({ review }) => {
  return (
    <div className="rounded-md p-4 m-1 shadow-md">
      <article>
        <div className="flex items-center mb-4">
          <img className="w-10 h-10 me-4 rounded-full" src="/docs/images/people/profile-picture-5.jpg" alt="" />
          <div className="font-medium dark:text-white">
            <p>user_creator {review.user_creator} <time className="block text-sm text-gray-500 dark:text-gray-400"></time></p>
          </div>
        </div>
        <div className="flex  mb-1 space-x-1 rtl:space-x-reverse">
          <h3 className="ms-2 text-sm  text-gray-300 dark:text-white">{review.rating}</h3>
          <StarIcon rating={review.rating > 0 ? review.rating : 0} />
          <h3 className="ms-2 text-sm font-semibold text-gray-900 dark:text-white">{review.title}</h3>
        </div>
        <p className="mb-2 text-gray-500 dark:text-gray-400">{review.description}</p>
        <aside>
        </aside>
      </article>

    </div>
  );
};

export default Review;
