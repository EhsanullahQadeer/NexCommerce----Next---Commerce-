import Slider from '@/components/Slider';
import ProductCategories from '@/features/product/categories';
import { FC } from 'react';

const Home: FC = () => {
  return (
    <>
      <Slider />
      <ProductCategories />
    </>
  );
};

export default Home;
