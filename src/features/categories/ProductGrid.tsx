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
  selectProductPageProducts,
  togglePreviewModal,
} from "@/store/slices/products/productsSlice";
import GalleryModal from "../elements/GalleryModal";
import { Product } from "@/types/product";
import ProductNotFound from "@/components/ProductDetails/ProductNotFound";
import useProducts from "@/hooks/home/useProducts";
import ProductCardSkeletonWrap from "@/components/Cards/ProductCardSkeltonWrap";

const origin = "productPage";
const ProductGrid = () => {
  const { products, currentPage, limitFilter, totalProducts } = useSelector(
    selectProductPageProducts
  );
  const dispatch = useDispatch();
  const { isLoading } = useProducts({ origin });
  const fetchMoreProducts = async () => {
    dispatch(handleMoreProduct({ payload: null, origin }));
  };

  const isMoreProducts = currentPage * limitFilter < totalProducts;

  // Calculate the number of items (remaining products)
  const items =
    currentPage === 1
      ? limitFilter
      : Math.min(limitFilter, totalProducts - products.length);

  return (
    <>
      <Container className="mt-5">
        <CategoryFilterToggle />

        <ProductCardSkeletonWrap
          {...{
            skeletonPosition: currentPage > 1 ? "after" : "before",
            items,
            show: isLoading,
          }}
        >
          {products.length === 0
            ? !isLoading && <ProductNotFound />
            : products.length && (
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
        </ProductCardSkeletonWrap>

        <div className="mt-10 mb-10">
          {isMoreProducts && (
            <Button
              variant={isLoading ? "disabled" : "outlined"}
              className="mx-auto"
              onClick={fetchMoreProducts}
            >
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
