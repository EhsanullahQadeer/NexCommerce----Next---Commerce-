"use client";

import Breadcrumb from "@/components/Breadcrumb";
import Button from "@/components/Button";
import Container from "@/components/Container";
import ProductNotFound from "@/components/ProductDetails/ProductNotFound";
import GalleryModal from "@/features/elements/GalleryModal";
import PreviewModal from "@/features/elements/PreviewModal";
import ProductDetails from "@/features/product-details";
import StickyBarBottom from "@/features/product-details/StickyBarBottom";
import { useFetchProductMutation } from "@/store/api/productApi";
import { addQuickViewProduct } from "@/store/slices/products/productsSlice";
import { Product } from "@/types/product";

import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const ProductDetailPage = () => {
  const dispatch = useDispatch();
  const { slug } = useParams<{ slug: string }>();
  const [fetchProduct] = useFetchProductMutation();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [productData, setProductData] = useState<Product | null>(null);
  const router = useRouter();
  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const response = await fetchProduct({ slug: slug }).unwrap();
        setProductData(response.data);
        dispatch(addQuickViewProduct(response.data));
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const links = [
    {
      url: "/",
      name: "Home",
    },
    {
      url: "/products",
      name: "products",
    },
    {
      url: "/default",
      name: "Product Details",
    },
  ];

  const handleOtherProducts = () => {
    router.push("/products");
  };

  return (
    <div>
      <Container>
        <Breadcrumb links={links} border="top" />
      </Container>
      {!isLoading && !productData ? (
        <ProductNotFound>
          <Button className="mx-auto my-8" onClick={handleOtherProducts}>
            Explore Other Products
            <i className="las la-sync ml-2"></i>
          </Button>
        </ProductNotFound>
      ) : (
        <>
          <ProductDetails isLoading={isLoading} productData={productData} />
          <StickyBarBottom isLoading={isLoading} />
          <PreviewModal />
          <GalleryModal />
        </>
      )}
    </div>
  );
};

export default ProductDetailPage;
