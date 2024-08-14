import Breadcrumb from '@/components/Breadcrumb';
import Container from '@/components/Container';
import CategoryFilterToggle from '@/components/Filters/CategoryFilterToggle';
import Hero from '@/components/Hero';
import ProductGrid from '@/features/categories/ProductGrid';
import { FC } from 'react';

const Categories: FC = () => {
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
      url: '/categories',
      name: 'Categories',
    }
  ]
  return (
    <div>
      <Hero title="Product Categories" subTitle='Shop' />
      <Container>
        <Breadcrumb links={links}/>
      </Container>
      <ProductGrid />

    </div>
  );
};

export default Categories;
