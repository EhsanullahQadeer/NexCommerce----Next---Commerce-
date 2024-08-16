import React, { FC, useRef, useState } from 'react';
import Image from 'next/image';
import type { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperCore } from 'swiper/types';
import { Navigation, Pagination, Thumbs } from 'swiper/modules';
import SlideArrow from './elements/SlideArrow';
import { cn } from '@/lib/utils';
import { sliderFullViewBtnStyles } from './styles/sliderStyles';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/pagination';
import './styles/slider.css';

const images: string[] = [
  '/products/product-preview/1.jpg',
  '/products/product-preview/2.jpg',
  '/products/product-preview/3.jpg',
  '/products/product-preview/2.jpg',
];

interface GallerySliderProps {
  direction?: 'vertical' | 'horizontal';
  showTotalSlides?: boolean;
  onFullScreen?: () => void;
}

const GallerySlider: FC<GallerySliderProps> = ({
  showTotalSlides,
  onFullScreen,
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore | null>(null);
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div>
      {showTotalSlides && (
        <div className="flex items-center justify-center text-sm font-extralight text-black-100 pt-4 mb-3">
          <span className="mr-1">{activeIndex + 1}</span> /
          <span className="ml-1">{images.length}</span>
        </div>
      )}
      <div className={cn('flex gap-2')}>
        {/* Thumbnails */}
        <div className={cn('flex')}>
          <Swiper
            onSwiper={setThumbsSwiper}
            direction={'vertical'}
            spaceBetween={10}
            slidesPerView={4}
            modules={[Navigation, Thumbs]}
            className="w-auto"
          >
            {images.map((img, index) => (
              <SwiperSlide
                key={index}
                className="max-h-[75px] lg:max-h-[125px] !w-auto"
              >
                <Image
                  fill
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className={cn(
                    '!relative max-h-[125px] md:min-w-[60px] md:max-h-[80px] lg:max-h-[125px] h-full object-cover cursor-pointer',
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
            onSlideChange={(swiper: SwiperCore) => {
              setActiveIndex(swiper.activeIndex);
            }}
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
          >
            {images.map((img, index) => (
              <SwiperSlide key={index} className="!w-full !max-w-full">
                <Image
                  fill
                  src={img}
                  alt={`Slide ${index + 1}`}
                  className="!relative w-full h-full object-cover"
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

          {onFullScreen && (
            <div className={sliderFullViewBtnStyles} onClick={onFullScreen}>
              <i className="las la-expand-arrows-alt text-xl"></i>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GallerySlider;
