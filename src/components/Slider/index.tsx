'use client';

import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { cn } from '@/lib/utils';
import Button from '../Button';

const navigationStyles =
  'group absolute flex h-[42px] w-[42px] items-center justify-center top-0 bottom-0 my-auto z-[10] cursor-pointer';

const Slider = () => {
  const navigationNextRef = useRef<HTMLDivElement | null>(null);
  const navigationPrevRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="relative h-[560px]">
      <Swiper
        rewind={true}
        navigation={{
          nextEl: navigationNextRef.current,
          prevEl: navigationPrevRef.current,
        }}
        modules={[Navigation]}
        className="h-full w-full"
      >
        <SwiperSlide className="bg-[url('/slide/slide-1.jpg')] bg-cover bg-center">
          <div className="flex items-center h-full max-w-container mx-auto">
            <div>
              <h3 className="text-primary font-extralight text-sm lg:text-base uppercase mb-[15px]">
                Seasonal Pick
              </h3>
              <h1 className="text-[3.125rem]  font-light text-black-75 leading-[60px] mb-[17px]">
                Get All
                <br />
                The Good Stuff
              </h1>
              <Button className="uppercase leading-[1.5] !py-[11.5px]">
                Discover More <i className="las la-arrow-right ml-2.5"></i>
              </Button>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="bg-[url('/slide/slide-2.jpg')] bg-cover bg-center">
          <div className="flex items-center h-full max-w-container mx-auto">
            <div>
              <h3 className="text-primary font-extralight text-sm lg:text-base uppercase mb-[15px]">
                all at 50% off
              </h3>
              <h1 className="text-[3.125rem]  font-light text-white leading-[60px] mb-[17px]">
                The Most Beautiful
                <br />
                Novelties In Our Shop
              </h1>
              <Button className="uppercase leading-[1.5] !py-[11.5px]">
                Shop now <i className="las la-arrow-right ml-2.5"></i>
              </Button>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
      <div>
        <div
          ref={navigationPrevRef}
          className={cn(
            'left-[5%] text-[22px] transition-all',
            navigationStyles
          )}
        >
          <i className="las la-angle-left text-black-500 group-hover:text-primary"></i>
        </div>
        <div
          ref={navigationNextRef}
          className={cn(
            'right-[5%] text-[22px] transition-all',
            navigationStyles
          )}
        >
          <i className="las la-angle-right text-black-500 group-hover:text-primary"></i>
        </div>
      </div>
    </div>
  );
};

export default Slider;
