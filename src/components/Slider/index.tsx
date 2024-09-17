"use client";

import { SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import SlideContent from "./elements/SlideContent";
import BaseSlider from "./elements/BaseSlider";
import { useFetchSlidersMutation } from "@/store/api/slidersApi";
import { useEffect, useState } from "react";
import { SlidersState } from "@/store/slices/sliders/slidersSlice";
import ProductCardSkeleton from "../Cards/ProductCardSkeleton";
import SliderSkeleton from "./SliderSkeleton";

const Slider: React.FC = () => {
  const [sliders, setSliders] = useState<SlidersState[]>([]);
  const [fetchSliders] = useFetchSlidersMutation();

  const getSlidersHandler = async () => {
    try {
      let { data } = await fetchSliders({}).unwrap();
      setSliders(data);
    } catch (error) {
      // handle error
    }
  };

  useEffect(() => {
    getSlidersHandler();
  }, []);

  return sliders.length === 0 ? (
    <SliderSkeleton />
  ) : (
    <BaseSlider className='h-[460px] lg:h-[480px] xl:h-[560px]'>
      {
        sliders.map((el: SlidersState, index) => (
          <SwiperSlide key={index} className='relative'>
            <div className='absolute inset-0 z-0'>
              <Image 
                src={el.image} 
                alt={el.title} 
                fill
                style={{ objectFit: 'cover' }} 
                priority={true} 
              />
            </div>
            <div className='relative top-52 z-10'>
              <SlideContent
                title={el.sub_title}
                heading={<>{el.title}</>}
                headingClass={`!text-${el.title_color}`}
                btnText={el.button_text}
                btnLink={el.link}
              />
            </div>
          </SwiperSlide>
        ))
      }
    </BaseSlider>
  );
};

export default Slider;
