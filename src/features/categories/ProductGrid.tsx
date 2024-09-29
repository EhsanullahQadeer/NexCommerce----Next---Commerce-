"use client";

import { useDispatch, useSelector } from "react-redux";
import Container from "@/components/Container";
import CategoryFilterToggle from "@/components/Filters/CategoryFilterToggle";
import ProductCardBoxed from "@/components/Cards/ProductCardBoxed";
import Button from "@/components/Button";
import CategoryFilterDrawer from "./CategoryFilterDrawer";
import PreviewModal from "../elements/PreviewModal";
import {
  addQuickViewProduct,
  handleMoreProduct,
  selectProducts,
  togglePreviewModal,
} from "@/store/slices/products/productsSlice";
import GalleryModal from "../elements/GalleryModal";
import { Product } from "@/types/product";
import { useFetchFilteredProductsMutation } from "@/store/api/productApi";
import ProductCardSkeleton from "@/components/Cards/ProductCardSkeleton";
import useIsMutating from "@/hooks/useIsMutating";
import ProductNotFound from "@/components/ProductDetails/ProductNotFound";

const ProductGrid = () => {
  const [fetchFilteredProducts] = useFetchFilteredProductsMutation();
  const {
    products,
    sizeFilter,
    currentPage,
    limitFilter,
    categoriesFilter,
    sortByFilter,
    colorFilter,
    priceRangeFilter,
  } = useSelector(selectProducts);
  const dispatch = useDispatch();
  const { apiStatus } = useIsMutating();
  const { isLoading } = apiStatus("fetchFilteredProducts");

  const fetchMoreProducts = async () => {
    try {
      if (products.length == currentPage * limitFilter) {
        let skipData = currentPage * limitFilter;

        const filter = {
          filters: {
            categories: categoriesFilter,
            sort: sortByFilter,
            color: colorFilter,
            size: sizeFilter,
            priceRange: `1-${priceRangeFilter}`,
          },
          pagination: {
            skip: skipData,
            limit: limitFilter,
          },
        };
        await fetchFilteredProducts(filter).unwrap();
        dispatch(handleMoreProduct());
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };
  const isMoreProducts = products.length == currentPage * limitFilter;
  return (
    <>
      <Container className="mt-5">
        <CategoryFilterToggle />
        {isLoading ? (
          <ProductCardSkeleton />
        ) : products.length === 0 ? (
          <ProductNotFound />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-5 gap-5">
            {products.map((item: Product) => (
              <ProductCardBoxed
                key={item.id}
                {...item}
                onPreview={() => {
                  dispatch(togglePreviewModal(true));
                  dispatch(addQuickViewProduct(item));
                }}
              />
            ))}
          </div>
        )}
        <div className="mt-10 mb-10">
          {isMoreProducts && (
            <Button className="mx-auto" onClick={fetchMoreProducts}>
              More Products <i className="las la-sync ml-2"></i>
            </Button>
          )}
        </div>
        <GalleryModal />
        <PreviewModal />
      </Container>
      <CategoryFilterDrawer />
    </>
  );
};

export default ProductGrid;
