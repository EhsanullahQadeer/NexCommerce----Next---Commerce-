'use client';

import dynamic from 'next/dynamic';
import ProductFilters from '@/components/Filters/ProductFilters';
import QuickPreviewModal from './QuickPreviewModal';

const GridLayout = dynamic(() => import('@/components/GridLayout'), {
  ssr: false,
});

const ProductCategories = () => {
  return (
    <div>
      <div className="max-w-container mx-auto px-2.5 !pt-10">
        <ProductFilters />
      </div>
      <div className="max-w-[1188px] mx-auto px-2.5">
        <GridLayout />
      </div>
      <QuickPreviewModal />
    </div>
  );
};

export default ProductCategories;
