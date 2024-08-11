import Slider from '@/components/Slider';
import ProductCategories from '@/features/Product/categories';
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
