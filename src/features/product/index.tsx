'use client';

import dynamic from 'next/dynamic';
import ProductFilters from '@/components/Filters/ProductFilters';
import PreviewModal from '../elements/PreviewModal';
import GalleryModal from '../elements/GalleryModal';
import useHome from '@/hooks/home/useHome';


const GridLayout = dynamic(() => import('@/components/GridLayout'), { ssr: false });

const ProductCategories = () => {
  useHome()
  return (
    <div>
      <div className="max-w-container mx-auto px-2.5 !pt-10">
        <ProductFilters />
      </div>
      <div className="max-w-[1208px] mx-auto px-2.5">
        <GridLayout />
      </div>
      <GalleryModal />
      <PreviewModal />
    </div>
  );
};

export default ProductCategories;
