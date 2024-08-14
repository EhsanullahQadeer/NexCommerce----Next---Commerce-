'use client';

import dynamic from 'next/dynamic';
import ProductFilters from '@/components/Filters/ProductFilters';
import PreviewModal from './PreviewModal';
import GalleryModal from './GalleryModal';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectProducts,
  toggleGalleryModal,
  togglePreviewModal,
} from '@/store/slices/products/productsSlice';

const GridLayout = dynamic(() => import('@/components/GridLayout'), {
  ssr: false,
});

const ProductCategories = () => {
  return (
    <div>
      <div className="max-w-container mx-auto px-2.5 !pt-10">
        <ProductFilters />
      </div>
      <div className="max-w-[1208px] mx-auto px-2.5">
        <GridLayout />
      </div>
      <PreviewModal />
      <GalleryModal />
    </div>
  );
};

export default ProductCategories;
