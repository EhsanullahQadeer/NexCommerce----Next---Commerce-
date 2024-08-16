import { useDispatch } from 'react-redux';
import ProductCardBoxed from '@/components/Cards/ProductCardBoxed';
import { products } from '@/store/slices/products/fakeProducts';
import { Product } from '@/types/product';
import { togglePreviewModal } from '@/store/slices/products/productsSlice';
import { SwiperSlide } from 'swiper/react';
import { Swiper } from 'swiper/react';
import { useRef } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import SlideArrow from '@/components/Slider/elements/SlideArrow';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/pagination';
import '@/components/Slider/styles/slider.css';

const ProductSlider = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const dispatch = useDispatch();

  return (
    <div>
      <h2 className="font-medium text-black-75 text-2xl font-normal mb-10 text-center">You May Also Like</h2>
      <div className="relative product-slider -ml-2.5 -mr-2.5">
        <Swiper
          observeParents
          observer
          modules={[Navigation, Pagination]}
          slidesPerView="auto"
          className='h-full w-full'
          pagination={{ clickable: true }}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          breakpoints={{
            480: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3
            },
            992: {
              slidesPerView: 4
            }
          }}
        >
          {products.map((item: Product) => (
            <SwiperSlide key={item.id} className="!h-full max-w-[297px] pb-[50px] px-2.5">
              <ProductCardBoxed
                {...item}
                onPreview={() => dispatch(togglePreviewModal(true))}
              />
            </SwiperSlide>
          ))}
        </Swiper>
          <div className="hidden lg:flex">
            <SlideArrow
              className="left-[-5%]"
              icon="la-angle-left"
              onClick={() => swiperRef.current?.slidePrev()}
            />
            <SlideArrow
              className="right-[-5%]"
              icon="la-angle-right"
              onClick={() => swiperRef.current?.slideNext()}
            />

          </div>
      </div>
    </div>
  );
};

export default ProductSlider;
