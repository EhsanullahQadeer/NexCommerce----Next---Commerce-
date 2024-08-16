'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';
import { Swiper, SwiperProps } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import type { Swiper as SwiperType } from 'swiper';
import SlideArrow from './SlideArrow';
import { cn } from '@/lib/utils';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../styles/slider.css';

interface BaseSliderProps extends SwiperProps {
  children: ReactNode;
  hideArrows?: boolean;
  arrowClass?: string;
  className?: string;
}

const BaseSlider: React.FC<BaseSliderProps> = ({
  children,
  hideArrows,
  arrowClass,
  className,
  ...props
}) => {
  const swiperRef = useRef<SwiperType | null>(null);
  
  return (
    <div className={cn("relative", className)}>
      <Swiper
        rewind={true}
        observeParents
        observer
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination]}
        className="h-full w-full"
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        {...props}
      >
        {children}
      </Swiper>
      {!hideArrows && (
        <div className="hidden lg:flex">
          <SlideArrow
            className={cn('left-[5%]', arrowClass)}
            icon="la-angle-left"
            onClick={() => swiperRef.current?.slidePrev()}
          />
          <SlideArrow
            className={cn('right-[5%]', arrowClass)}
            icon="la-angle-right"
            onClick={() => swiperRef.current?.slideNext()}
          />
        </div>
      )}
    </div>
  );
};

export default BaseSlider;
