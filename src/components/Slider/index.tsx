'use client';

import { SwiperSlide } from 'swiper/react';

import SlideContent from './elements/SlideContent';
import BaseSlider from './elements/BaseSlider';

const Slider: React.FC = () => {

  return (
    <BaseSlider>
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
    </BaseSlider>
  );
};

export default Slider;
