import { useDispatch, useSelector } from "react-redux";
import ProductCardBoxed from "@/components/Cards/ProductCardBoxed";
// import { products } from "@/store/slices/products/fakeProducts";
import { Product, ProductCategory } from "@/types/product";
import {
  selectProducts,
  togglePreviewModal,
} from "@/store/slices/products/productsSlice";
import { SwiperSlide } from "swiper/react";
import { Swiper } from "swiper/react";
import { useEffect, useRef, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import SlideArrow from "@/components/Slider/elements/SlideArrow";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/pagination";
import "@/components/Slider/styles/slider.css";
import { useFetchFilteredProductsMutation } from "@/store/api/productApi";

interface ProductSliderProps {
  product_categories?: any;
}
const ProductSlider = (props: ProductSliderProps) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [fetchFilteredProducts] = useFetchFilteredProductsMutation();
  const [products, setProducts] = useState<Product[]>([]);
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

    // if (props.product_categories != undefined) {
    //   const categoryId = props.product_categories[0].category_id;
    //     // const { data: relatedProducts = [], isLoading } = useFetchProductsByCategoryQuery(product?.categoryId);
    // }

    (async () => {
      if (props.product_categories && props.product_categories.length > 0) {
        const categoryId = props.product_categories[0].category_id;
        // Fetch products based on the selected category
        try {
          const response = await fetchFilteredProducts({
            filters: { categoryId },
            pagination: { skip: 0, limit: 10 },
          }).unwrap();
          setProducts(response.data.data);
        } catch (error) {}
      }
    })();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [props.product_categories, fetchFilteredProducts]);

  const dispatch = useDispatch();

  return (
    <div>
      <h2 className="font-medium text-black-75 text-2xl font-normal mb-10 text-center">
        You May Also Like
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
          {products.map((item: Product) => (
            <SwiperSlide
              key={item.id}
              className="max-w-[297px] px-2.5 mb-[50px]"
            >
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
