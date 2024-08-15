import { FC, lazy } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectProducts,
  toggleGalleryModal,
  togglePreviewModal,
} from '@/store/slices/products/productsSlice';
import GallerySlider from '@/components/Slider/GallerySlider';
import ProductDetailsColumn from '../product-details/ProductDetailsColumn';

const Modal = lazy(() => import('@/components/Modal'));

const PreviewModal: FC = () => {
  const { isPreviewModalOpen } = useSelector(selectProducts);
  const dispatch = useDispatch();

  const handleOnClosePreviewModal = () => {
    dispatch(togglePreviewModal(false));
  };

  return (
    <Modal
      isOpen={isPreviewModalOpen}
      onClose={handleOnClosePreviewModal}
      id="quick-preview-modal"
    >
      <div
      className='grid grid-cols md:grid-cols-2 gap-5 px-5 py-10'
    >
      <div>
        <GallerySlider
          onFullScreen={() => dispatch(toggleGalleryModal(true))}
        />
      </div>
      <div className='px-5 mt-[30px]'>
        <ProductDetailsColumn isModal />
      </div>
    </div>
    </Modal>
  );
};

export default PreviewModal;
