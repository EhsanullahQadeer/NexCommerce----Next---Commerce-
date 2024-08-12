import Modal from '@/components/Modal';
import GallerySlider from '@/components/Slider/GallerySlider';
import ProductDetails from '../details';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectProducts,
  togglePreviewModal,
} from '@/store/slices/products/productsSlice';

const QuickPreviewModal = () => {
  const { isPreviewModalOpen } = useSelector(selectProducts);
  const dispatch = useDispatch();

  return (
    <Modal
      isOpen={isPreviewModalOpen}
      onClose={() => dispatch(togglePreviewModal(false))}
    >
      <div className="grid grid-cols md:grid-cols-2 lg:grid-cols-[57%_43%] gap-5 px-5 py-10">
        <div className="px-5">
          <GallerySlider />
        </div>
        <div className="px-5 mt-[30px] md:max-w-[450px]">
          <ProductDetails />
        </div>
      </div>
    </Modal>
  );
};

export default QuickPreviewModal;
