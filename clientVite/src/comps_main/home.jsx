import React, { useState } from 'react';
import TestimonialSlider from './testimonialSlider'; // Replace with your TestimonialSlider component
import { ChatIcon } from '../comps_users/Icons';
import QaChat from './qaChat';

const Home = () => {
  const [showChat, setShowChat] = useState(false);

  const toggleChat = () => {
    setShowChat(!showChat);
  };

  return (
    <div className='flex flex-wrap relative'>
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
      <button
        className="z-20 fixed bottom-5 right-5 bg-blue-500 text-white rounded-full w-16 h-16 flex items-center justify-center cursor-pointer"
        onClick={toggleChat}
      >
        <ChatIcon />
      </button>
      {showChat && <QaChat />}
    </div>
  );
};

export default Home;
