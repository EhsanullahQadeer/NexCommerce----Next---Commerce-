'use client';

import { ReactNode, useRef } from 'react';
import { Swiper } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import type { Swiper as SwiperType } from 'swiper';
import SlideArrow from './SlideArrow';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../styles/swiper-pagination.css';
import { cn } from '@/lib/utils';

interface BaseSliderProps {
  children: ReactNode;
  hideArrows?: boolean;
  arrowClass?: string;
}

const BaseSlider: React.FC<BaseSliderProps> = ({ children, hideArrows, arrowClass }) => {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <div className="relative h-[460px] lg:h-[480px] xl:h-[560px]">
      <Swiper
        rewind={true}
        observer
        observeParents
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination]}
        className="h-full w-full"
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        {children}
      </Swiper>
      {!hideArrows && (
        <div className="hidden lg:flex">
          <SlideArrow
            className={cn("left-[5%]", arrowClass)}
            icon="la-angle-left"
            onClick={() => swiperRef.current?.slidePrev()}
          />
          <SlideArrow
            className={cn("right-[5%]", arrowClass)}
            icon="la-angle-right"
            onClick={() => swiperRef.current?.slideNext()}
          />
        </div>
      )}
    </div>
  );
};

export default BaseSlider;
