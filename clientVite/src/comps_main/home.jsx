import React from 'react'
import Cookies from 'js-cookie';
import TestimonialSlider from './testimonialSlider';
const Home = () => {

  return (
    <div className='flex flex-wrap'>
      <div className="w-full md:w-1/2">
        <img src="https://firebasestorage.googleapis.com/v0/b/volunteer-project-3a891.appspot.com/o/image_1703703745303?alt=media&token=329b8609-d1e6-47d1-9259-799e40f1f605" alt="" className="max-w-full h-auto" />
      </div>
      <div className="w-full md:w-1/2 px-3 flex items-center">
        <div className="text-7xl font-bold">
          <p className=" leading-snug">
            We all are HERE 
            for each other
          </p>
        </div>
      </div>
      <TestimonialSlider />
    </div>
  );
}

export default Home