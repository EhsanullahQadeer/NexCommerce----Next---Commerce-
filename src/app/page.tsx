import { FC } from 'react';
import ProductCategories from '@/features/Product/categories';
import dynamic from 'next/dynamic';

const Slider = dynamic(import('@/components/Slider'), { ssr: false });

const Home: FC = () => {
  return (
    <>
      <Slider />
      <ProductCategories />
    </>
  );
};

export default Home;
