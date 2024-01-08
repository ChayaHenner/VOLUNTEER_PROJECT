import React, { useState } from 'react';
import TestimonialSlider from './testimonialSlider'; // Replace with your TestimonialSlider component
import { ArrowDownIcon, ChatIcon, CheckIcon, EditIcon, SearchIcon } from '../comps_users/Icons';
import QaChat from './qaChat';
import CustomerReviewsSlider from './reviewHome';
import ImageCarousel from './imageCarousel';


const Home = () => {
  const [showChat, setShowChat] = useState(false);

  const toggleChat = () => {
    setShowChat(!showChat);
  };

  return (
    <div className=''>
      <div className="flex flex-wrap relative">
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
      </div>
      <div className="m-3 flex flex-wrap relative">

        <div className="w-full md:w-1/2 px-3 flex items-center">
          <div className="">
            <p className=" leading-snug text-7xl font-bold">
              give
              in 3 simple steps
            </p>

            <div className=" animate animate-bounce">
              <ArrowDownIcon className="text-blue-500 w-10 h-10" />
            </div>
            <div className="m-1">
              <div className=" p-2 flex items-center">
                <div className="p-2 rounded-full bg-gray-200 w-24 h-24 flex items-center justify-center">
                  <EditIcon className="" />
                </div>
                <div className="mt-2 text-xl mx-4">Sign Up</div>
              </div>
              <div className=" p-2 flex items-center">
                <div className="p-2 rounded-full bg-gray-200 w-24 h-24 flex items-center justify-center">
                  <SearchIcon className="" />
                </div>
                <div className="mt-2 text-xl mx-4">Find  Opportunities</div>
              </div>
              <div className=" p-2 flex items-center">
                <div className="p-2 rounded-full bg-gray-200 w-24 h-24 flex items-center justify-center">
                  <CheckIcon className="" />
                </div>
                <div className="mt-2 text-xl mx-4">Take  Mission</div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2">

          <img src="https://firebasestorage.googleapis.com/v0/b/volunteer-project-3a891.appspot.com/o/image_1704705962872?alt=media&token=92e957b9-5e83-4c72-9fd7-1d5bb7c46de8" alt="" className="max-w-full h-auto" />

        </div>
      </div>
      <div className="flex flex-wrap relative">
        <div className="w-full md:w-1/2">

          <img src="https://firebasestorage.googleapis.com/v0/b/volunteer-project-3a891.appspot.com/o/image_1704709809600?alt=media" alt="" className="max-w-full h-auto" />
        </div>
        <div className="w-full md:w-1/2 px-3 flex items-center">
          <div className="">
            <p className=" leading-snug">
              we saw a            </p>
          </div>
        </div>
      </div>
      {/* <section class="bg-white mb-20 md:mb-52 xl:mb-72">

        <div class="container max-w-screen-xl mx-auto px-4">

          <nav class="flex-wrap lg:flex items-center py-14 xl:relative z-10" x-data="{navbarOpen:false}">

            <div class="flex items-center justify-between mb-10 lg:mb-0">
              <img src="https://firebasestorage.googleapis.com/v0/b/volunteer-project-3a891.appspot.com/o/image_1704704679434?alt=media&token=1a35b6cd-79bb-4724-95f5-549e54ced1b7" alt="Logo img" class="w-52 md:w-80 lg:w-full" />

              <button class="lg:hidden w-10 h-10 ml-auto flex items-center justify-center text-green-700 border border-green-700 rounded-md">
                <i data-feather="menu"></i>
              </button>
            </div>

            <ul class="lg:flex flex-col lg:flex-row lg:items-center lg:mx-auto lg:space-x-8 xl:space-x-16" >

              <li class="font-semibold text-gray-900 text-lg hover:text-gray-400 transition ease-in-out duration-300 mb-5 lg:mb-0">
                <a href="#">Landing</a>
              </li>

              <li class="font-semibold text-gray-900 text-lg hover:text-gray-400 transition ease-in-out duration-300 mb-5 lg:mb-0">
                <a href="#">Pages</a>
              </li>

              <li class="font-semibold text-gray-900 text-lg hover:text-gray-400 transition ease-in-out duration-300 mb-5 lg:mb-0">
                <a href="#">Contact</a>
              </li>

              <li class="font-semibold text-gray-900 text-lg hover:text-gray-400 transition ease-in-out duration-300 mb-5 lg:mb-0">
                <a href="#">About</a>
              </li>

            </ul>

            <button class="px-5 py-3 lg:block border-2 border-green-700 rounded-lg font-semibold text-green-700 text-lg hover:bg-green-700 hover:text-white transition ease-linear duration-500" >
              Request quote
            </button>

          </nav>

          <div class="flex items-center justify-center xl:justify-start">

            <div class="mt-28 text-center xl:text-left">
              <h1 class="font-semibold text-4xl md:text-6xl lg:text-7xl text-gray-900 leading-normal mb-6">Get your dream  house now</h1>

              <p class="font-normal text-xl text-gray-400 leading-relaxed mb-12">Having a sweet home is everyone's dream. Have you  owned your dream house?</p>

              <button class="px-6 py-4 bg-green-700 text-white font-semibold text-lg rounded-xl hover:bg-green-900 transition ease-in-out duration-500">Contact us</button>
            </div>

            <div class="hidden xl:block xl:absolute z-0 top-0 right-0">
              <img src="https://firebasestorage.googleapis.com/v0/b/volunteer-project-3a891.appspot.com/o/image_1704704679434?alt=media&token=1a35b6cd-79bb-4724-95f5-549e54ced1b7" alt="Home img" />
            </div>

          </div>

        </div>

      </section> */}

      {/* <section class="bg-white py-10 md:py-16 xl:relative">

        <div class="container max-w-screen-xl mx-auto px-4">

          <div class="flex flex-col xl:flex-row justify-end">

            <div class="hidden xl:block xl:absolute left-0 bottom-0 w-full">
              <img src="assets/image/feature-img.png" alt="Feature img" />
            </div>

            <div class="">

              <h1 class="font-semibold text-gray-900 text-xl md:text-4xl text-center leading-normal mb-6">Choice of various types of <br> house</h1>

              <p class="font-normal text-gray-400 text-md md:text-xl text-center mb-16">We provide a wide of selection of home types for you and your <br> family and are free to choose a home model</p>

              <div class="flex flex-col md:flex-row justify-center xl:justify-start space-x-4 mb-20">
                <div class="px-8 h-20 mx-auto md:mx-0 bg-gray-200 rounded-lg flex items-center justify-center mb-5 md:mb-0">
                  <i data-feather="check-circle" class=" text-green-900"></i>
                </div>

                <div class="text-center md:text-left">
                  <h4 class="font-semibold text-gray-900 text-2xl mb-2">Best Home Guarantee</h4>
                  <p class="font-normal text-gray-400 text-xl leading-relaxed">We guarantees the quality of your home you bought <br> from D’house</p>
                </div>
              </div>

              <div class="flex flex-col md:flex-row justify-center xl:justify-start space-x-4 mb-20">
                <div class="px-8 h-20 mx-auto md:mx-0 bg-gray-200 rounded-lg flex items-center justify-center mb-5 md:mb-0">
                  <i data-feather="lock" class=" text-green-900"></i>
                </div>

                <div class="text-center md:text-left">
                  <h4 class="font-semibold text-gray-900 text-2xl mb-2">Safe Transaction</h4>
                  <p class="font-normal text-gray-400 text-xl leading-relaxed">Your transactions will always be kept confidential <br> and will get discounted</p>
                </div>
              </div>

              <div class="flex flex-col md:flex-row justify-center xl:justify-start space-x-4">
                <div class="px-8 h-20 mx-auto md:mx-0 bg-gray-200 rounded-lg flex items-center justify-center mb-5 md:mb-0">
                  <i data-feather="credit-card" class=" text-green-900"></i>
                </div>

                <div class="text-center md:text-left">
                  <h4 class="font-semibold text-gray-900 text-2xl mb-2">Low and Cost Home Taxes</h4>
                  <p class="font-normal text-gray-400 text-xl leading-relaxed">By buying a house from D’house, you will get a tax <br> discount</p>
                </div>
              </div>

            </div>

          </div>

        </div>

      </section> */}
      {/* 
<section class="bg-white py-10 md:py-16">

<div class="container max-w-screen-xl mx-auto px-4">

    <h1 class="font-semibold text-gray-900 text-4xl text-center mb-10">Our Gallery</h1>

    <div class="hidden md:block flex items-center text-center space-x-10 lg:space-x-20 mb-12">
        <a href="#" class="px-6 py-2 bg-green-800 text-white font-semibold text-xl rounded-lg hover:bg-green-600 transition ease-in-out duration-500">All</a>
        <a href="#" class="px-6 py-2 text-gray-900 font-normal text-xl rounded-lg hover:bg-gray-200 hover:text-gray-400 transition ease-in-out duration-500">Exterior</a>
        <a href="#" class="px-6 py-2 text-gray-900 font-normal text-xl rounded-lg hover:bg-gray-200 hover:text-gray-400 transition ease-in-out duration-500">Interior</a>
        <a href="#" class="px-6 py-2 text-gray-900 font-normal text-xl rounded-lg hover:bg-gray-200 hover:text-gray-400 transition ease-in-out duration-500">Building</a>
    </div>

    <div class="flex space-x-4 md:space-x-6 lg:space-x-8">
        <div>
            <img src="assets/image/gallery-1.png" alt="image" class="mb-4 md:mb-6 lg:mb-8 hover:opacity-75 transition ease-in-out duration-500">
            <img src="assets/image/gallery-4.png" alt="image" class="hover:opacity-75 transition ease-in-out duration-500">
        </div>

        <div>
            <img src="assets/image/gallery-2.png" alt="image" class="mb-4 md:mb-6 lg:mb-8 hover:opacity-75 transition ease-in-out duration-500">
            <img src="assets/image/gallery-5.png" alt="image" class="mb-3 md:mb-6 lg:mb-8 hover:opacity-75 transition ease-in-out duration-500">
            <img src="assets/image/gallery-6.png" alt="image" class="hover:opacity-75 transition ease-in-out duration-500">
        </div>

        <div>
            <img src="assets/image/gallery-3.png" alt="image" class="mb-4 md:mb-6 lg:mb-8 hover:opacity-75 transition ease-in-out duration-500">
            <img src="assets/image/gallery-7.png" alt="image" class="hover:opacity-75 transition ease-in-out duration-500">
        </div>
    </div>

</div> 

</section> */}

      {/* <section class="bg-white py-10 md:py-16">

        <div class="container max-w-screen-xl mx-auto px-4 xl:relative">

          <p class="font-normal text-gray-400 text-lg md:text-xl text-center uppercase mb-6">Testimonial</p>

          <h1 class="font-semibold text-gray-900 text-2xl md:text-4xl text-center leading-normal mb-14">What People Say  About D’house</h1>

          <div class="hidden xl:block xl:absolute top-0">
            <img src="assets/image/testimoni-1.png" alt="Image" />
          </div>

          <div class="hidden xl:block xl:absolute top-32">
            <img src="assets/image/testimoni-2.png" alt="Image" />
          </div>

          <div class="flex flex-col md:flex-row md:items-center justify-center md:space-x-8 lg:space-x-12 mb-10 md:mb-20">

            <div class="bg-gray-100 rounded-lg mb-10 md:mb-0">
              <img src="assets/image/testimoni-3.png" alt="Image" class="mx-8 my-8" />

              <div class="flex items-center gap-5 mx-8">
                <i data-feather="star" class="text-yellow-500"></i>
                <i data-feather="star" class="text-yellow-500"></i>
                <i data-feather="star" class="text-yellow-500"></i>
                <i data-feather="star" class="text-yellow-500"></i>
                <i data-feather="star" class="text-yellow-500"></i>
              </div>

              <p class="font-normal text-sm lg:text-md text-gray-400 mx-8 my-8">I recommend anyone to buy house on D’house. I received great customer service <br> from the specialists who helped me.</p>

              <h3 class="font-semibold text-gray-900 text-xl md:text-2xl lg:text-3xl mx-8 mb-8">Brooklyn Simmons</h3>
            </div>

            <div class="bg-gray-100 rounded-lg">
              <img src="assets/image/testimoni-4.png" alt="Image" class="mx-8 my-8" />

              <div class="flex items-center gap-5 mx-8">
                <i data-feather="star" class="text-yellow-500"></i>
                <i data-feather="star" class="text-yellow-500"></i>
                <i data-feather="star" class="text-yellow-500"></i>
                <i data-feather="star" class="text-yellow-500"></i>
                <i data-feather="star" class="text-yellow-500"></i>
              </div>

              <p class="font-normal text-sm lg:text-md text-gray-400 mx-8 my-8">D’house is the best property agent in the  world. I received great customer service <br> from the D’house agent</p>

              <h3 class="font-semibold text-gray-900 text-xl md:text-2xl lg:text-3xl mx-8 mb-8">Ralph Edwards</h3>
            </div>

          </div>

        </div>

      </section> */}

      {/* <section class="bg-white py-10 md:py-16">

        <div class="container max-w-screen-xl mx-auto px-4 xl:relative">

          <div class="bg-green-800 flex flex-col lg:flex-row items-center justify-evenly py-14 rounded-3xl">

            <div class="text-center lg:text-left mb-10 lg:mb-0">
              <h1 class="font-semibold text-white text-4xl md:text-5xl lg:text-7xl leading-normal mb-4">Talk to us  to discuss</h1>

              <p class="font-normal text-white text-md md:text-xl">Need more time to discuss? Won’t worry, we are  ready to help you. You can fill in the column on the  right to book a meeting with us. Totally free.</p>
            </div>

            <div class="hidden xl:block xl:absolute right-0">
              <img src="https://firebasestorage.googleapis.com/v0/b/volunteer-project-3a891.appspot.com/o/image_1704704679434?alt=media&token=1a35b6cd-79bb-4724-95f5-549e54ced1b7" alt="Image" />
            </div>

            <div class="hidden md:block bg-white xl:relative px-6 py-3 rounded-3xl">
              <div class="py-3">
                <h3 class="font-semibold text-gray-900 text-3xl">Book a meeting</h3>
              </div>

              <div class="py-3">
                <input type="text" placeholder="Full Name" class="px-4 py-4 w-96 bg-gray-100 placeholder-gray-400 rounded-xl outline-none" />
              </div>

              <div class="py-3">
                <input type="text" placeholder="Email" class="px-4 py-4 w-96 bg-gray-100 placeholder-gray-400 rounded-xl outline-none" />
              </div>

              <div class="py-3 relative">
                <input type="text" placeholder="Date" class="px-4 py-4 w-96 bg-gray-100 font-normal text-lg placeholder-gray-400 rounded-xl outline-none" />

                <div class="absolute inset-y-0 left-80 ml-6 flex items-center text-xl text-gray-600">
                  <i data-feather="calendar"></i>
                </div>
              </div>

              <div class="py-3 relative">
                <input type="text" placeholder="Virtual Meeting" class="px-4 py-4 w-96 bg-gray-100 placeholder-gray-400 rounded-xl outline-none" />

                <div class="absolute inset-y-0 left-80 ml-6 flex items-center text-xl text-gray-600">
                  <i data-feather="chevron-down"></i>
                </div>
              </div>

              <div class="py-3">
                <button class="w-full py-4 font-semibold text-lg text-white bg-green-700 rounded-xl hover:bg-green-900 transition ease-in-out duration-500">Booking</button>
              </div>
            </div>

          </div>

        </div>

      </section>
      <footer class="bg-white py-10 md:py-16">

        <div class="container max-w-screen-xl mx-auto px-4">

          <div class="flex flex-col lg:flex-row justify-between">
            <div class="text-center lg:text-left mb-10 lg:mb-0">
              <div class="flex justify-center lg:justify-start mb-5">
                <img src="https://firebasestorage.googleapis.com/v0/b/volunteer-project-3a891.appspot.com/o/image_1704704679434?alt=media&token=1a35b6cd-79bb-4724-95f5-549e54ced1b7" alt="Image" />
              </div>

              <p class="font-light text-gray-400 text-xl mb-10">join us today</p>

              <div class="flex items-center justify-center lg:justify-start space-x-5">
                <a href="#" class="px-3 py-3 bg-gray-200 text-gray-700 rounded-full hover:bg-green-800 hover:text-white transition ease-in-out duration-500">
                  <i data-feather="facebook"></i>
                </a>

                <a href="#" class="px-3 py-3 bg-gray-200 text-gray-700 rounded-full hover:bg-green-800 hover:text-white transition ease-in-out duration-500">
                  <i data-feather="twitter"></i>
                </a>

                <a href="#" class="px-3 py-3 bg-gray-200 text-gray-700 rounded-full hover:bg-green-800 hover:text-white transition ease-in-out duration-500">
                  <i data-feather="linkedin"></i>
                </a>
              </div>
            </div>

            <div class="text-center lg:text-left mb-10 lg:mb-0">
              <h4 class="font-semibold text-gray-900 text-2xl mb-6">Sitemap</h4>

              <a href="#" class="block font-light text-gray-400 text-xl mb-6 hover:text-gray-800 transition ease-in-out duration-300">Home</a>

              <a href="#" class="block font-light text-gray-400 text-xl mb-6 hover:text-gray-800 transition ease-in-out duration-300">Features</a>

              <a href="#" class="block font-light text-gray-400 text-xl mb-6 hover:text-gray-800 transition ease-in-out duration-300">Gallery</a>

              <a href="#" class="block font-light text-gray-400 text-xl mb-6 hover:text-gray-800 transition ease-in-out duration-300">Testimoni</a>

              <a href="#" class="block font-light text-gray-400 text-xl mb-6 hover:text-gray-800 transition ease-in-out duration-300">Book a meeting</a>
            </div>

            <div class="text-center lg:text-left mb-10 lg:mb-0">
              <h4 class="font-semibold text-gray-900 text-2xl mb-6">Landing</h4>

              <a href="#" class="block font-light text-gray-400 text-xl mb-6 hover:text-gray-800 transition ease-in-out duration-300">Mobile App</a>

              <a href="#" class="block font-light text-gray-400 text-xl mb-6 hover:text-gray-800 transition ease-in-out duration-300">Property</a>

              <a href="#" class="block font-light text-gray-400 text-xl mb-6 hover:text-gray-800 transition ease-in-out duration-300">Personal Website</a>

              <a href="#" class="block font-light text-gray-400 text-xl mb-6 hover:text-gray-800 transition ease-in-out duration-300">Web Developer</a>

              <a href="#" class="block font-light text-gray-400 text-xl mb-6 hover:text-gray-800 transition ease-in-out duration-300">Online Course</a>

              <a href="#" class="block font-light text-gray-400 text-xl mb-6 hover:text-gray-800 transition ease-in-out duration-300">Donation</a>
            </div>

            <div class="text-center lg:text-left">
              <h4 class="font-semibold text-gray-900 text-2xl mb-6">Utility</h4>

              <a href="#" class="block font-light text-gray-400 text-xl mb-6 hover:text-gray-800 transition ease-in-out duration-300">FAQ</a>

              <a href="#" class="block font-light text-gray-400 text-xl mb-6 hover:text-gray-800 transition ease-in-out duration-300">Terms & Conditions</a>
            </div>
          </div>

        </div>

      </footer> */}


      {/* <div className='this'>
        <section class="bg-white py-10 md:py-16 xl:relative">

          <div class="container max-w-screen-xl mx-auto px-4">

            <div class="flex flex-col xl:flex-row justify-end">

              <div class="flex items-center justify-center xl:justify-start">

                <div class="mt-28 text-center xl:text-left">
                  <h1 class="font-semibold text-4xl md:text-6xl lg:text-7xl text-gray-900 leading-normal mb-6">Get your dream  house now</h1>

                  <p class="font-normal text-xl text-gray-400 leading-relaxed mb-12">Having a sweet home is everyone's dream. Have you owned your dream house?</p>

                  <button class="px-6 py-4 bg-green-700 text-white font-semibold text-lg rounded-xl hover:bg-green-900 transition ease-in-out duration-500">Contact us</button>
                </div>

                <div class="hidden xl:block xl:absolute z-0 top-0 right-0">
                  <img src="https://firebasestorage.googleapis.com/v0/b/volunteer-project-3a891.appspot.com/o/image_1704704679434?alt=media&token=1a35b6cd-79bb-4724-95f5-549e54ced1b7" alt="Home img" />
                </div>

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

      </div> */}

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
