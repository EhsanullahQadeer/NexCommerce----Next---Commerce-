import { FC } from 'react';
import Breadcrumb from '@/components/Breadcrumb';
import Container from '@/components/Container';
import Hero from '@/components/Hero';
import ProductCategoriesComponent from '@/features/categories';

const ProductCategories: FC = () => {
  const links = [
    {
      url: '/',
      name: 'Home',
    },
    {
      url: '/categories',
      name: 'Categories',
    }
  ]
  return (
    <div>
      <Hero title="Product Categories" subTitle='Shop' />
      <Breadcrumb links={links}/>
      <Container>
        <ProductCategoriesComponent />
      </Container>
    </div>
  );
};

export default ProductCategories;
