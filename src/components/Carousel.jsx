import { ChevronRight } from 'lucide-react';
import { ChevronLeft } from 'lucide-react';
import { useRef } from 'react';
import { useState, useEffect } from 'react';

const Carousel = ({ slides }) => {
  const [curr, setCurr] = useState(0);
  const carouselEl = useRef(null);
  console.log(slides);

  const prev = () =>
    setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));

  const next = () =>
    setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));

  useEffect(() => {
    const slideInterval = setInterval(
      () =>
        setCurr((curr) =>
          curr === slides.length - 1 ? 0 : curr + 1
        ),
      3000
    );
    return () => clearInterval(slideInterval);
  }, [slides]);

  return (
    <div
      ref={carouselEl}
      className="relative overflow-hidden rounded-lg border border-neutral-700"
    >
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${curr * 100}%)` }}
      >
        {slides.map((sl) => (
          <div
            key={sl.id}
            className="flex aspect-video w-full flex-shrink-0 items-center justify-center"
          >
            <img
              src={sl.image}
              alt={`Game Screenshot ${sl.id}`}
              className="h-full w-full object-cover opacity-0 transition-opacity duration-700"
              onLoad={(e) => (e.target.style.opacity = 1)}
              loading="lazy"
            />
          </div>
        ))}
      </div>
      <div className="absolute inset-0 flex items-center justify-between p-4">
        <button
          onClick={prev}
          aria-label="Previous slide"
          className="transform rounded-full border border-neutral-700 bg-neutral-900 p-1 text-neutral-200 shadow transition-transform hover:scale-110"
        >
          <ChevronLeft className="max-md:h-4 max-md:w-4" />
        </button>
        <button
          onClick={next}
          aria-label="Next slide"
          className="transform rounded-full border border-neutral-700 bg-neutral-900 p-1 text-neutral-200 shadow transition-transform hover:scale-110"
        >
          <ChevronRight className="max-md:h-4 max-md:w-4" />
        </button>
      </div>
      <div className="absolute right-0 bottom-4 left-0">
        <div className="flex items-center justify-center gap-2">
          {slides.map((_, i) => (
            <div
              key={i}
              aria-current={curr === i ? 'true' : 'false'}
              className={`h-1.5 w-1.5 rounded-full bg-white transition-all ${curr === i ? 'scale-150' : 'bg-opacity-50'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
