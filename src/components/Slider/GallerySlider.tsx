import React, { useRef, useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperCore } from 'swiper/types';
import { Navigation, Pagination, Thumbs } from 'swiper/modules';
import SlideArrow from './elements/SlideArrow';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/pagination';
import './styles/swiper-pagination.css';
import { cn } from '@/lib/utils';

const images: string[] = [
  '/products/product-preview/1.jpg',
  '/products/product-preview/2.jpg',
  '/products/product-preview/3.jpg',
  '/products/product-preview/2.jpg',
];

const GallerySlider: React.FC = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore | null>(null);
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex gap-2">
      {/* Thumbnails */}
      <div className="flex flex-cols">
        <Swiper
          onSwiper={setThumbsSwiper}
          direction="vertical"
          spaceBetween={10}
          slidesPerView={4}
          modules={[Navigation, Thumbs]}
          className="w-auto"
        >
          {images.map((img, index) => (
            <SwiperSlide key={index} className="max-h-[75px] lg:max-h-[161px] !w-auto">
              <img
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className={cn(
                  'max-h-[161px] md:min-w-[60px] md:max-h-[80px] lg:max-h-[161px] h-full object-cover cursor-pointer',
                  activeIndex === index
                    ? 'opacity-100'
                    : 'opacity-60 hover:opacity-100',
                  activeIndex === index && 'border border-primary-50'
                )}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Main Slider */}
      <div className="relative gallery-slider w-full">
        <Swiper
          rewind={true}
          spaceBetween={10}
          pagination={{ clickable: true }}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[Navigation, Thumbs, Pagination]}
          className=""
          onSlideChange={(swiper: SwiperCore) => {
            setActiveIndex(swiper.activeIndex);
          }}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
        >
          {images.map((img, index) => (
            <SwiperSlide key={index} className="!w-full !max-w-full">
              <img
                src={img}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="hidden lg:flex">
          <SlideArrow
            className="left-[5%]"
            icon="la-angle-left !text-white text-[30px] group-hover:!text-primary"
            onClick={() => swiperRef.current?.slidePrev()}
          />
          <SlideArrow
            className="right-[5%]"
            icon="la-angle-right text-[30px] !text-white group-hover:!text-primary"
            onClick={() => swiperRef.current?.slideNext()}
          />
        </div>
      </div>
    </div>
  );
};

export default GallerySlider;
