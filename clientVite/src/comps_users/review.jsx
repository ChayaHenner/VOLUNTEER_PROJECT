import React from 'react';
import StarIcon from './starIcon'
const Review = ({ review }) => {
  // const review = props.review; // Destructuring props
  return (
    <div className="rounded-md p-4 m-1 shadow-md">
      <article>
        <div class="flex items-center mb-4">
          <img class="w-10 h-10 me-4 rounded-full" src="/docs/images/people/profile-picture-5.jpg" alt="" />
          <div class="font-medium dark:text-white">
            <p>user_creator{review.user_creator} <time datetime="2014-08-16 19:00" class="block text-sm text-gray-500 dark:text-gray-400"></time></p>
          </div>
        </div>
        <div class="flex  mb-1 space-x-1 rtl:space-x-reverse">
          <h3 class="ms-2 text-sm  text-gray-300 dark:text-white">{review.rating}</h3>
          <StarIcon rating={review.rating > 0 ? review.rating : 0} />
          <h3 class="ms-2 text-sm font-semibold text-gray-900 dark:text-white">{review.title}</h3>
        </div>
        <p class="mb-2 text-gray-500 dark:text-gray-400">{review.description}</p>
        <aside>
        </aside>
      </article>

    </div>
  );
};

export default Review;
