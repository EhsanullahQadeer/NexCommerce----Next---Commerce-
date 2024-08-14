import Modal from '@/components/Modal';
import {
  selectProducts,
  toggleGalleryModal,
} from '@/store/slices/products/productsSlice';
import dynamic from 'next/dynamic';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const GallerySlider = dynamic(import('@/components/Slider/GallerySlider'), {
  ssr: false,
});

const GalleryModal: FC = () => {
  const { isGalleryFullView } = useSelector(selectProducts);
  const dispatch = useDispatch();
  return (
    <Modal
      isOpen={isGalleryFullView}
      onClose={() => dispatch(toggleGalleryModal(false))}
      fullWidth
      id="gallery-full-view"
    >
      <div className="max-w-[654px] mx-auto px-5 mb-10">
        <GallerySlider direction="horizontal" showTotalSlides />
      </div>
    </Modal>
  );
};

export default GalleryModal;
