import React, { useState } from "react";

const TestimonialSlider = () => {
    const testimonials = [
        {
            name: 'John Doe',
            role: 'Web Developer',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus gravida consequat libero, ac convallis dolor tincidunt at. Sed congue aliquet orci, nec efficitur est suscipit vitae.'
        },
        {
            name: 'Jane Smith',
            role: 'UX Designer',
            content: 'Suspendisse id lorem quis magna molestie vestibulum vitae vitae nulla. Proin at dapibus enim, non posuere libero. Curabitur congue efficitur nibh, sit amet vulputate sapien vestibulum id.'
        },
        {
            name: 'Alice Johnson',
            role: 'Photographer',
            content: 'Fusce nec turpis ac augue feugiat tempor. Aliquam aliquet erat sit amet ipsum dignissim, a commodo odio viverra. Quisque sit amet felis vel libero tristique vehicula.'
        },
        // Add more testimonials following the same structure
    ];
    const [currentPage, setCurrentPage] = useState(0);

    const testimonialsPerPage = 3;
    const totalPages = Math.ceil(testimonials.length / testimonialsPerPage);

    const goToPage = (page) => {
        setCurrentPage(page);
    };

    const nextPage = () => {
        setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
    };

    const prevPage = () => {
        setCurrentPage((prevPage) => (prevPage === 0 ? totalPages - 1 : prevPage - 1));
    };

    return (
        <div className="py-5">
            <div className="max-w-7xl mx-auto">
                <div className="relative">
                    <div className="flex space-x-4 overflow-x-auto">
                        {testimonials
                            .slice(
                                currentPage * testimonialsPerPage,
                                (currentPage + 1) * testimonialsPerPage
                            )
                            .map((testimonial, index) => (
                                <div
                                    key={index}
                                    className="flex-shrink-0 flex flex-col items-center p-4 bg-gray-100 rounded-lg shadow-md"
                                >
                                    {/* Testimonial Avatar */}
                                    <div className="flex justify-center mb-4">
                                        <img
                                            src={`https://via.placeholder.com/150?text=Avatar${index + 1}`}
                                            className="rounded-full shadow-2xl"
                                            width="150"
                                            height="150"
                                            alt="User Avatar"
                                        />
                                    </div>
                                    {/* Testimonial Details */}
                                    <h5 className="mb-3">{testimonial.name}</h5>
                                    <h6 className="text-primary mb-3">{testimonial.role}</h6>
                                    <p className="px-3 text-center">{testimonial.content}</p>
                                </div>
                            ))}
                    </div>
                    {/* Navigation Buttons */}
                    {totalPages > 1 && (
                        <div className="absolute bottom-0 right-0 left-0 flex justify-center space-x-4 mt-4">
                            <button
                                onClick={prevPage}
                                className="px-4 py-2 bg-gray-200 rounded-lg"
                            >
                                Prev
                            </button>
                            {[...Array(totalPages)].map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => goToPage(index)}
                                    className={`px-4 py-2 rounded-lg ${currentPage === index ? "bg-blue-500 text-white" : "bg-gray-200"
                                        }`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                            <button
                                onClick={nextPage}
                                className="px-4 py-2 bg-gray-200 rounded-lg"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TestimonialSlider;
