"use client";

import Breadcrumb from "@/components/Breadcrumb";
import Container from "@/components/Container";
import GalleryModal from "@/features/elements/GalleryModal";
import PreviewModal from "@/features/elements/PreviewModal";
import ProductDetails from "@/features/product-details";
import StickyBarBottom from "@/features/product-details/StickyBarBottom";
import { useFetchProductMutation } from "@/store/api/productApi";
import { addQuickViewProduct } from "@/store/slices/products/productsSlice";
import { Product } from "@/types/product";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const ProductDetailPage = () => {
  const dispatch = useDispatch();
  const { slug } = useParams<{ slug: string }>();
  const [fetchProduct] = useFetchProductMutation();
  const [productData, setProductData] = useState<Product | null>(null);
  useEffect(() => {
    (async () => {
      try {
        const response = await fetchProduct({ slug: slug }).unwrap();
        setProductData(response.data);
        dispatch(addQuickViewProduct(response.data));
      } catch (error) {}
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

  return (
    <div>
      <Container>
        <Breadcrumb links={links} border="top" />
      </Container>
      <ProductDetails productData={productData} />
      <StickyBarBottom isLoading={!productData}/>

      <PreviewModal />
      <GalleryModal />
    </div>
  );
};

export default ProductDetailPage;
