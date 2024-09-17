"use client";
import { useSelector } from "react-redux";
import CardComponent from "./CardComponent";
import { selectProducts } from "@/store/slices/products/productsSlice";
import { categories } from "./data";
import CategoryCardSkeleton from "./CategoryCardSkeleton";

const ProductCategoriesComponent = () => {
  const { productCategories } = useSelector(selectProducts);

  return !productCategories.length ? (
    <CategoryCardSkeleton />
  ) : (
    <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 lg:gap-5 mt-10 mb-[50px]">
      {productCategories.map(
        (item, index) =>
          item.products_count > 0 && <CardComponent key={index} {...item} />
      )}
    </div>
  );
};

export default ProductCategoriesComponent;
