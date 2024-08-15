import { FC } from 'react';
import ProductCategories from '@/features/product';
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
