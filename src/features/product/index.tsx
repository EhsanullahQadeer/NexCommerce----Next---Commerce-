"use client";

import dynamic from "next/dynamic";
import ProductFilters from "@/components/Filters/ProductFilters";
import PreviewModal from "../elements/PreviewModal";
import GalleryModal from "../elements/GalleryModal";
import useProducts from "@/hooks/home/useProducts";

const GridLayout = dynamic(() => import("@/components/GridLayout"), {
  ssr: false,
});

const ProductCategories = () => {
  const { isLoading , } = useProducts({ origin: "homePage" });
  return (
    <div>
      <div className="max-w-container mx-auto px-2.5 !pt-10">
        <ProductFilters />
      </div>
      <div className="max-w-[1208px] mx-auto px-2.5">
        <GridLayout {...{ isLoading }} />
      </div>
      <GalleryModal />
      <PreviewModal />
    </div>
  );
};

export default ProductCategories;
