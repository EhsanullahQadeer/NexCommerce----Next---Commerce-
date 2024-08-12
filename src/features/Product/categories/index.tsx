'use client';

import dynamic from 'next/dynamic';
import ProductFilters from '@/components/Filters/ProductFilters';
import Modal from '@/components/Modal';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectProducts,
  togglePreviewModal,
} from '@/store/slices/products/productsSlice';
import GallerySlider from '@/components/Slider/GallerySlider';
import ProductDetails from '../details';

const GridLayout = dynamic(() => import('@/components/GridLayout'), {
  ssr: false,
});

const ProductCategories = () => {
  const { isPreviewModalOpen } = useSelector(selectProducts);
  const dispatch = useDispatch();

  return (
    <div>
      <div className="max-w-container mx-auto px-2.5 !pt-10">
        <ProductFilters />
      </div>
      <div className="max-w-[1188px] mx-auto">
        <GridLayout />
      </div>
      <Modal
        isOpen={isPreviewModalOpen}
        onClose={() => dispatch(togglePreviewModal(false))}
      >
        <div className='grid grid-cols md:grid-cols-2 lg:grid-cols-[57%_43%] gap-5 px-5 py-10'>
          <div className='px-5'>
            <GallerySlider />
          </div>
          <div className='px-5 mt-[30px] md:max-w-[450px]'>
            <ProductDetails />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProductCategories;
