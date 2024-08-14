import { FC } from 'react';
import Modal from '@/components/Modal';
import ProductDetails from '../details';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectProducts,
  toggleGalleryModal,
  togglePreviewModal,
} from '@/store/slices/products/productsSlice';
import dynamic from 'next/dynamic';

const GallerySlider = dynamic(import('@/components/Slider/GallerySlider'), {
  ssr: false,
});

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
      <div className="grid grid-cols md:grid-cols-2 lg:grid-cols-[57%_43%] gap-5 px-5 py-10">
        <div className="px-5">
          <GallerySlider
            onFullScreen={() => dispatch(toggleGalleryModal(true))}
          />
        </div>
        <div className="px-5 mt-[30px] md:max-w-[450px]">
          <ProductDetails />
        </div>
      </div>
    </Modal>
  );
};

export default PreviewModal;
