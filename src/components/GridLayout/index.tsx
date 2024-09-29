"use client";

import React, { useEffect, useRef } from "react";
import Isotope from "isotope-layout";
import ProductCard from "../Cards/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import {
  addQuickViewProduct,
  selectProducts,
  togglePreviewModal,
} from "@/store/slices/products/productsSlice";
import { cn } from "@/lib/utils";
import { useImagesLoaded } from "@/hooks/useImagesLoaded";
import Button from "../Button";
import { Product } from "@/types/product";
import ProductCardSkeleton from "../Cards/ProductCardSkeleton";
import { useRouter } from "next/navigation";
import useIsMutating from "@/hooks/useIsMutating";
import ProductNotFound from "../ProductDetails/ProductNotFound";

const createCatFilter = (item: any) => {
  if (item && item.length) {
    return "cat-" + item[0].category_id;
  }

  return "cat-0";
};

const GridLayout: React.FC = () => {
  const router = useRouter();
  const isotope = useRef<Isotope | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const imagesLoaded = useImagesLoaded(gridRef);
  const { filterKey, products, productCategories, currentPage, limitFilter } =
    useSelector(selectProducts);
  const { apiStatus } = useIsMutating();

  const dispatch = useDispatch();

  useEffect(() => {
    if (imagesLoaded && gridRef.current && !isotope.current) {
      isotope.current = new Isotope(gridRef.current, {
        itemSelector: ".product-item",
        layoutMode: "fitRows",
        fitRows: {
          gutter: 0,
        },
      });
    }

    const handleResize = () => {
      isotope.current?.layout();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      isotope.current?.destroy();
      isotope.current = null;
    };
  }, [products, filterKey, productCategories]);

  useEffect(() => {
    if (isotope.current) {
      isotope.current.arrange({
        filter: filterKey !== "*" ? `.${filterKey}` : "*",
      });
    }
  }, [products, filterKey, productCategories]);
  const { isLoading } = apiStatus("fetchFilteredProducts");
  if (isLoading) {
    return <ProductCardSkeleton />;
  }

  return (
    <div className="bg-white">
      {products.length ? (
        <>
          <div ref={gridRef} className="!relative mt-5">
            {products.map((item: Product, index) => (
              <div
                key={item.id + index}
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
              </div>
            ))}
          </div>
          <div className="mt-10 mb-10">
            {products.length == currentPage * limitFilter && (
              <Button
                className="mx-auto"
                onClick={() => router.push("/products")}
              >
                More Products <i className="las la-sync ml-2"></i>
              </Button>
            )}
          </div>
        </>
      ) : (
       <ProductNotFound/>
      )}
    </div>
  );
};

export default GridLayout;
