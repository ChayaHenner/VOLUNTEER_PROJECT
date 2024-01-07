// ImageCarousel.js
import React from 'react';
import Slider from 'react-slick';

const ImageCarousel = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 20000, // Change speed as needed
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000, // Change autoplay speed as needed
    };

    const images = [
        "https://images.pexels.com/photos/6647037/pexels-photo-6647037.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/7551646/pexels-photo-7551646.jpeg?auto=compress&cs=tinysrgb&w=600"
    ];

    return (
        <Slider {...settings}>
            {images.map((image, index) => (
                <div key={index}>
                    <img src={image} alt={`Carousel Image ${index}`} className="max-w-full h-auto" />
                </div>
            ))}
        </Slider>
    );
};

export default ImageCarousel;
