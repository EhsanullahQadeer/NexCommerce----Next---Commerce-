import { useDispatch, useSelector } from "react-redux";
import ProductCardBoxed from "@/components/Cards/ProductCardBoxed";
import { products } from "@/store/slices/products/fakeProducts";
import { Product } from "@/types/product";
import { togglePreviewModal } from "@/store/slices/products/productsSlice";
import { SwiperSlide } from "swiper/react";
import { Swiper } from "swiper/react";
import { useEffect, useRef } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import SlideArrow from "@/components/Slider/elements/SlideArrow";
import BlogCard from "@/components/Cards/BlogCard";
import { RootState } from "@/store";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/pagination";
import "@/components/Slider/styles/slider.css";
import { Blog } from "@/types/blog";


const RelatedPosts = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const dispatch = useDispatch();
  const blogs = useSelector((state: RootState) => state.blogs.blogs);


  useEffect(() => {
    const handleResize = () => {
      const slides = document.querySelectorAll(".swiper-slide");
      let maxHeight = 0;

      // Reset all slides height
      slides.forEach((slide) => {
        (slide as HTMLElement).style.height = "auto";
      });

      // Calculate the maximum height of all slides
      slides.forEach((slide) => {
        const height = (slide as HTMLElement).offsetHeight;
        if (height > maxHeight) maxHeight = height;
      });

      // Set all slides to the maximum height
      slides.forEach((slide) => {
        (slide as HTMLElement).style.height = `${maxHeight}px`;
      });
    };

    // Initial call
    handleResize();

    // Recalculate heights on window resize
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <h2 className="font-medium text-black-75 text-lg mb-6 text-left">
        Related Posts
      </h2>
      <div className="relative product-slider -ml-2.5 -mr-2.5">
        <Swiper
          observeParents
          observer
          modules={[Navigation, Pagination]}
          slidesPerView="auto"
          pagination={{ clickable: true }}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          breakpoints={{
            480: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            992: {
              slidesPerView: 4,
            },
          }}
        >
          {blogs.map((item: Blog, index) => (
            <SwiperSlide
              key={index}
              className="max-w-[297px] px-2.5 mb-[50px]"
            >
              <BlogCard
                {...item}
                relatedCard={true}
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

export default RelatedPosts;
