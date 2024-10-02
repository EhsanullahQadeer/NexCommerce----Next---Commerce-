"use client";

import React, { useEffect, useRef, useState } from "react";
import Isotope from "isotope-layout";
import ProductCard from "../Cards/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import {
  addQuickViewProduct,
  selectHomePageProducts,
  togglePreviewModal,
  handleMoreProduct,
} from "@/store/slices/products/productsSlice";
import { cn } from "@/lib/utils";
import Button from "../Button";
import { Product } from "@/types/product";
import { useRouter } from "next/navigation";
import ProductNotFound from "../ProductDetails/ProductNotFound";
import ProductCardSkeletonWrap from "../Cards/ProductCardSkeltonWrap";
import { motion } from "framer-motion";
const createCatFilter = (item: any) => {
  if (item && item.length) {
    return "cat-" + item[0].category_id;
  }

  return "cat-0";
};

interface Iprops {
  isLoading: boolean;
}
const GridLayout: React.FC<Iprops> = (props) => {
  const { isLoading } = props;
  const router = useRouter();
  // const [isotope, setIsotope] = useState<Isotope | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const { filterKey, products, currentPage, limitFilter, totalProducts } =
    useSelector(selectHomePageProducts);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (gridRef.current && !isotope && !isLoading) {
  //     const newIsotope = new Isotope(gridRef.current, {
  //       itemSelector: ".product-item",
  //       layoutMode: "fitRows",
  //       fitRows: {
  //         gutter: 0,
  //       },
  //     });

  //     setIsotope(newIsotope);
  //   }

  //   const handleResize = () => {
  //     isotope?.layout();
  //   };
  //   window.addEventListener("resize", handleResize);

  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //     isotope?.destroy();
  //     setIsotope(null);
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isLoading]);

  // useEffect(() => {
  //   if (isotope && !isLoading) {
  //     isotope.arrange({
  //       filter: filterKey !== "*" ? `.${filterKey}` : "*",
  //     });
  //   }
  // }, [isotope, products, filterKey, isLoading]);

  const isMoreProducts = currentPage * limitFilter < totalProducts;
  const handleMoreProducts = () => {
    if (isMoreProducts) {
      dispatch(handleMoreProduct({ payload: null, origin: "homePage" }));
    } else {
      router.push("/products");
    }
  };
  const items =
    currentPage === 1
      ? limitFilter
      : Math.min(limitFilter, totalProducts - products.length);

  return (
    <div className="bg-white">
      <ProductCardSkeletonWrap
        {...{
          skeletonPosition: currentPage > 1 ? "after" : "before",
          items: 8,
          show: isLoading,
        }}
      >
        {products.length ? (
          <>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
            >
              <div ref={gridRef} className="!relative mt-5">
                {products.map((item: Product, index) => (
                  <motion.div
                    key={item.id + index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className={cn(
                      "product-item p-2.5 float-left w-full max-w-full xs:max-w-[50%] md:max-w-[33.33%] lg:max-w-[25%]",
                      createCatFilter(item.product_categories)
                    )}
                  >
                    <ProductCard
                      {...item}
                      onPreview={() => {
                        dispatch(togglePreviewModal(true));
                        dispatch(addQuickViewProduct(item));
                      }}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </>
        ) : (
          !isLoading && <ProductNotFound />
        )}
      </ProductCardSkeletonWrap>
      <div className="mt-10 mb-10">
        <Button
          variant={isMoreProducts && isLoading ? "disabled" : "outlined"}
          className="mx-auto"
          onClick={handleMoreProducts}
        >
          {!isMoreProducts && "Explore"} More Products
          <i className="las la-sync ml-2"></i>
        </Button>
      </div>
    </div>
  );
};

export default GridLayout;
