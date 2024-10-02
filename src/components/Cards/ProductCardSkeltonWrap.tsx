import React, { ReactNode } from "react";
import ProductCardSkeleton from "./ProductCardSkeleton";

interface Iprops {
  items?: number;
  children: ReactNode;
  skeletonPosition?: "before" | "after";
  show: boolean;
}
const ProductCardSkeletonWrap = (props: Iprops) => {
  const { items, children, skeletonPosition = "before", show } = props;
  console.log('show: ', show);
  return (
    <div className="flex flex-col">
      {skeletonPosition === "before" && show && (
        <ProductCardSkeleton {...{ items }} />
      )}
      {children}
      {skeletonPosition === "after" && show && (
        <ProductCardSkeleton {...{ items }} />
      )}
    </div>
  );
};

export default ProductCardSkeletonWrap;
