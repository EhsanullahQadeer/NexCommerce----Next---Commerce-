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
          return <SwiperSlide key={index} style={{ backgroundImage: `url('${el.image}')` }} className={`bg-cover bg-center`}>
            <SlideContent
              title={el.sub_title}
              heading={
                <>
                  {el.title}
                </>
              }
              headingClass={`!text-${el.title_color}`}
              btnText={el.button_text}
              btnLink={el.link}
            />
          </SwiperSlide>
        })
      }
    </BaseSlider>
  );
};

export default Slider;
