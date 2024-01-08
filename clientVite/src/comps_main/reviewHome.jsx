import React, { useEffect } from 'react';
import KeenSlider from 'keen-slider';
import 'keen-slider/keen-slider.min.css'; // Import KeenSlider styles

const CustomerReviewsSlider = () => {
    useEffect(() => {
        const slider = new KeenSlider("#keen-slider", {
            loop: true,
            slidesPerView: 1.25,
            spacing: 16,
            breakpoints: {
                '(min-width: 1024px)': {
                    slidesPerView: 2.5,
                    spacing: 32,
                },
            },
        });

        const keenSliderPrevious = document.getElementById('keen-slider-previous');
        const keenSliderNext = document.getElementById('keen-slider-next');

        keenSliderPrevious.addEventListener('click', () => slider.prev());
        keenSliderNext.addEventListener('click', () => slider.next());

        return () => {
            // Clean up KeenSlider instance when component unmounts
            slider.destroy();
            keenSliderPrevious.removeEventListener('click', () => slider.prev());
            keenSliderNext.removeEventListener('click', () => slider.next());
        };
    }, []);

    return (
        <section className="bg-gray-50">
            <div className="mx-auto max-w-[1340px] px-4 py-12 sm:px-6 lg:me-0 lg:py-16 lg:pe-0 lg:ps-8 xl:py-24">
                <div className="max-w-7xl">
                    <h2 className="max-w-xl text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                        Read trusted reviews from our customers
                    </h2>

                    <div className="mt-8 flex items-center">
                        <button
                            aria-label="Previous slide"
                            id="keen-slider-previous"
                            className="rounded-full border border-rose-600 p-3 text-rose-600 transition hover:bg-rose-600 hover:text-white"
                        >
                            &lt;
                        </button>

                        <div id="keen-slider" className="keen-slider">
                            <div className="keen-slider__slide">
                                <div className="flex gap-0.5 text-green-500">
                                    {/* Stars or rating icons */}
                                    ★★★★★
                                </div>
                                <div className="mt-4">
                                    <p className="text-2xl font-bold text-rose-600 sm:text-3xl">Great Product!</p>
                                    <p className="mt-4 leading-relaxed text-gray-700">
                                        This product exceeded my expectations. It's high quality and performs really well.
                                    </p>
                                </div>
                                <footer className="mt-4 text-sm font-medium text-gray-700 sm:mt-6">
                                    &mdash; John Doe
                                </footer>
                            </div>

                            <div className="keen-slider__slide">
                                {/* Add another review here */}
                            </div>

                            {/* Add more reviews using similar keen-slider__slide structure */}
                        </div>

                        <button
                            aria-label="Next slide"
                            id="keen-slider-next"
                            className="rounded-full border border-rose-600 p-3 text-rose-600 transition hover:bg-rose-600 hover:text-white"
                        >
                            &gt;
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CustomerReviewsSlider;
