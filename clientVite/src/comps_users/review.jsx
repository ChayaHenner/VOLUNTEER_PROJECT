import React from 'react';

const Review = ({review}) => {
  // const review = props.review; // Destructuring props

  return (
    <div className="rounded-md p-4 m-1 shadow-md">
      <h2 className="text-xl font-semibold mb-2">{review.title}</h2>
      <p className="text-gray-600 mb-2">{review.description}</p>
      <div className="flex items-center">
        <span className="text-yellow-500">{review.rating}</span>
      </div>
      <p className="text-sm text-gray-500 mt-2">Review by {review.user_creator}</p>
    </div>
  );
};

export default Review;
