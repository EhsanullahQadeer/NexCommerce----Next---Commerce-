'use client';

import Breadcrumb from "@/components/Breadcrumb";
import Container from "@/components/Container";

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
        <h1 className="text-center">Product details page under contstruction!!</h1>
      </Container>
    </div>
  )
}

export default ProductDetailPage;
