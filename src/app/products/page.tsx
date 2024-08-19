import { FC } from 'react';
import Breadcrumb from '@/components/Breadcrumb';
import Container from '@/components/Container';
import Hero from '@/components/Hero';
import ProductGrid from '@/features/categories/ProductGrid';

const Products: FC = () => {
  const links = [
    {
      url: '/',
      name: 'Home',
    },
    {
      url: '/products',
      name: 'products',
    }
  ]
  return (
    <div>
      <Hero title="Products" subTitle='Shop' />
      <Container>
        <Breadcrumb links={links}/>
      </Container>
      <ProductGrid />
    </div>
  );
};

export default Products;
