import Modal from '@/components/Modal';
import GallerySlider from '@/components/Slider/GallerySlider';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectProducts,
  toggleGalleryModal,
  togglePreviewModal,
} from '@/store/slices/products/productsSlice';

const GalleryModal = () => {
  const { isGalleryFullView } = useSelector(selectProducts);
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(togglePreviewModal(false));
    dispatch(toggleGalleryModal(false));
  };

  return (
    <Modal
      isOpen={isGalleryFullView}
      onClose={handleCloseModal}
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
