import React, { useState } from 'react';
import TestimonialSlider from './testimonialSlider'; // Replace with your TestimonialSlider component
import { ChatIcon } from '../comps_users/Icons';
import QaChat from './qaChat';
import CustomerReviewsSlider from './reviewHome';
import ImageCarousel from './imageCarousel';


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

      <div className='this'>
        <section class="bg-white py-10 md:py-16 xl:relative">

          <div class="container max-w-screen-xl mx-auto px-4">

            <div class="flex flex-col xl:flex-row justify-end">

              <div class="hidden xl:block xl:absolute left-0 bottom-0 w-full">
                <img src="assets/image/feature-img.png" alt="Feature img" />
              </div>

              <div class="">

                <h1 class="font-semibold text-gray-900 text-xl md:text-4xl text-center leading-normal mb-6">Choice of various types of house</h1>

                <p class="font-normal text-gray-400 text-md md:text-xl text-center mb-16">We provide a wide of selection of home types for you and your family and are free to choose a home model</p>

                <div class="flex flex-col md:flex-row justify-center xl:justify-start space-x-4 mb-20">
                  <div class="px-8 h-20 mx-auto md:mx-0 bg-gray-200 rounded-lg flex items-center justify-center mb-5 md:mb-0">
                    <i data-feather="check-circle" class=" text-green-900"></i>
                  </div>

                  <div class="text-center md:text-left">
                    <h4 class="font-semibold text-gray-900 text-2xl mb-2">Best Home Guarantee</h4>
                    <p class="font-normal text-gray-400 text-xl leading-relaxed">We guarantees the quality of your home you bought  from D’house</p>
                  </div>
                </div>

                <div class="flex flex-col md:flex-row justify-center xl:justify-start space-x-4 mb-20">
                  <div class="px-8 h-20 mx-auto md:mx-0 bg-gray-200 rounded-lg flex items-center justify-center mb-5 md:mb-0">
                    <i data-feather="lock" class=" text-green-900"></i>
                  </div>

                  <div class="text-center md:text-left">
                    <h4 class="font-semibold text-gray-900 text-2xl mb-2">Safe Transaction</h4>
                    <p class="font-normal text-gray-400 text-xl leading-relaxed">Your transactions will always be kept confidential  and will get discounted</p>
                  </div>
                </div>

                <div class="flex flex-col md:flex-row justify-center xl:justify-start space-x-4">
                  <div class="px-8 h-20 mx-auto md:mx-0 bg-gray-200 rounded-lg flex items-center justify-center mb-5 md:mb-0">
                    <i data-feather="credit-card" class=" text-green-900"></i>
                  </div>

                  <div class="text-center md:text-left">
                    <h4 class="font-semibold text-gray-900 text-2xl mb-2">Low and Cost Home Taxes</h4>
                    <p class="font-normal text-gray-400 text-xl leading-relaxed">By buying a house from D’house, you will get a tax  discount</p>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </section>

      </div>

      <ImageCarousel />

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
