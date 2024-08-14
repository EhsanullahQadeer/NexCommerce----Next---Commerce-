import { FC } from 'react';
import ProductCategories from '@/features/Product/categories';
import Slider from '@/components/Slider';

const Home: FC = () => {
  return (
    <>
      <Slider />
      <ProductCategories />
    </>
  );
};

export default Home;
