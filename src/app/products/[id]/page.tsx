'use client';

import Breadcrumb from "@/components/Breadcrumb";
import Container from "@/components/Container";
import ProductDetails from "@/features/product-details";
import StickyBarBottom from "@/features/product-details/StickyBarBottom";

const ProductDetailPage = () => {
  const links = [
    {
      url: '/',
      name: 'Home',
    },
    {
      url: '/products',
      name: 'products',
    },
    {
      url: '/default',
      name: 'Default',
    }
  ]
  return (
    <div>
      <Container>
        <Breadcrumb links={links} border="top"/>
      </Container>
      <ProductDetails />
      <StickyBarBottom />
    </div>
  )
}

export default ProductDetailPage;
