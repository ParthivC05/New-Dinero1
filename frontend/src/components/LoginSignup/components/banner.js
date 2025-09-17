import React, { useState, useEffect, useRef } from 'react';
// import useSignup from '../hooks/useSignup';
import slider1 from '@/assets/png/slider1.png';
import slider2 from '@/assets/png/slider2.png';
import Image from 'next/image';

const sliderImages = [slider1, slider2, slider2, slider1];

const getSlides = (images, perSlide = 2) => {
  const slides = [];
  for (let i = 0; i < images.length; i += perSlide) {
    slides.push(images.slice(i, i + perSlide));
  }
  return slides;
};

const slides = getSlides(sliderImages, 2);

const AUTO_SLIDE_INTERVAL = 2500;
function Banner() {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef(null);
  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  useEffect(() => {
    timeoutRef.current = setInterval(nextSlide, AUTO_SLIDE_INTERVAL);
    return () => clearInterval(timeoutRef.current);
  }, [current]);
  return (
    <div className="mb-6 relative max-w-xl mx-auto">
      <div className="overflow-hidden rounded-lg">
        <div
          className="flex transition-transform duration-700"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slides.map((slideImgs, idx) => (
            <div key={idx} className="flex gap-4 min-w-full justify-center">
              {slideImgs.map((img, i) => (
                <Image
                  key={i}
                  src={img}
                  alt={`Banner ${idx * 2 + i + 1}`}
                  className="rounded-lg object-cover h-44 w-1/2"
                  style={{ minWidth: 180 }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <button
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 text-white rounded-full p-2 hover:bg-black/80 z-10"
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        &#8592;
      </button>
      <button
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 text-white rounded-full p-2 hover:bg-black/80 z-10"
        onClick={nextSlide}
        aria-label="Next slide"
      >
        &#8594;
      </button>
      <div className="flex justify-center gap-2 mt-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            className={`w-2 h-2 rounded-full ${current === idx ? 'bg-pink-500' : 'bg-gray-500'}`}
            onClick={() => setCurrent(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default Banner;
