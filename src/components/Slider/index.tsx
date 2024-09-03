'use client';

import { SwiperSlide } from 'swiper/react';

import SlideContent from './elements/SlideContent';
import BaseSlider from './elements/BaseSlider';
import { useFetchSlidersMutation } from '@/store/api/slidersApi';
import { useEffect, useState } from 'react';
import { SlidersState } from '@/store/slices/sliders/slidersSlice';

const Slider: React.FC = () => {
  const [sliders, setSliders] = useState([])
  const [fetchSliders] = useFetchSlidersMutation()

  const getSlidersHandler = async () => {
    try {
      let { data } = await fetchSliders({}).unwrap();
      console.log("sliders", data);
      setSliders(data)

    } catch (error) {
    }
  }

  useEffect(() => {
    getSlidersHandler()
  }, [])

  return (
    <BaseSlider className='h-[460px] lg:h-[480px] xl:h-[560px]'>
      {
        sliders.map((el: SlidersState, index) => {
          return <SwiperSlide key={index} style={{ backgroundImage: `url('https://alertifyhub.com/${el.image}')` }} className={`bg-cover bg-center`}>
            <SlideContent
              title={el.sub_title}
              heading={
                <>
                  {el.title}
                </>
              }
              headingClass={`!text-${el.titleColor}`}
              btnText={el.button_text}
              btnLink={el.link}
            />
          </SwiperSlide>
        })
      }
      {/* <SwiperSlide className="bg-[url('/slide/slide-1.jpg')] bg-cover bg-center">
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
      </SwiperSlide> */}
    </BaseSlider>
  );
};

export default Slider;
