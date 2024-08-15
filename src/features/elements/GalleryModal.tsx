import { FC, lazy } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GallerySlider from '@/components/Slider/GallerySlider';
import {
  selectProducts,
  toggleGalleryModal,
} from '@/store/slices/products/productsSlice';

const Modal = lazy(() => import('@/components/Modal'));

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
