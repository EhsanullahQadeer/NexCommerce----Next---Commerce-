'use client';

import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

// Define the types for the ref and swiper instance
import type { Swiper as SwiperType } from 'swiper';
import SlideContent from './SlideContent';
import SlideArrow from './SlideArrow';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './swiper-pagination.css';

const Slider: React.FC = () => {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <div className="relative h-[460px] lg:h-[480px] xl:h-[560px]">
      <Swiper
        rewind={true}
        observer
        observeParents
        loop
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination]}
        className="h-full w-full"
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        <SwiperSlide className="bg-[url('/slide/slide-1.jpg')] bg-cover bg-center">
          <SlideContent
            title="SEASONAL PICKS"
            heading={
              <>
                Get All
                <br />
                The Good Stuff
              </>
            }
            btnText="Discover more"
          />
        </SwiperSlide>
        <SwiperSlide className="bg-[url('/slide/slide-2.jpg')] bg-cover bg-center">
          <SlideContent
            title="all at 50% off"
            heading={
              <>
                The Most Beautiful
                <br />
                Novelties In Our Shop
              </>
            }
            headingClass="!text-white"
            btnText="Shop now"
          />
        </SwiperSlide>
      </Swiper>
      <div className="hidden lg:flex">
        <SlideArrow
          className='left-[5%]'
          icon="la-angle-left"
          onClick={() => swiperRef.current?.slidePrev()}
        />
        <SlideArrow
          className='right-[5%]'
          icon="la-angle-right"
          onClick={() => swiperRef.current?.slideNext()}
        />
      </div>
    </div>
  );
};

export default Slider;
