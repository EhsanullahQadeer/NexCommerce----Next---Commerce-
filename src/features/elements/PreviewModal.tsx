import { FC, lazy } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addQuickViewProduct,
  selectProducts,
  toggleGalleryModal,
  togglePreviewModal,
} from '@/store/slices/products/productsSlice';
import GallerySlider from '@/components/Slider/GallerySlider';
import ProductDetailsColumn from '../product-details/ProductDetailsColumn';

const Modal = lazy(() => import('@/components/Modal'));

const PreviewModal: FC = () => {

  const { isPreviewModalOpen, quickViewProduct, isGalleryFullView } = useSelector(selectProducts);
  const { images, image } = quickViewProduct || {}
  const dispatch = useDispatch();

  const handleOnClosePreviewModal = () => {
    if (!isGalleryFullView) {
      dispatch(addQuickViewProduct(null));
      dispatch(togglePreviewModal(false));
    }
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
            images={images ? [image || "", ...images] : [image || ""]}
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
