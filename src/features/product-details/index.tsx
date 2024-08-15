import { useDispatch } from 'react-redux';
import Container from '@/components/Container';
import GallerySlider from '@/components/Slider/GallerySlider';
import ProductDetailsColumn from './ProductDetailsColumn';
import { toggleGalleryModal } from '@/store/slices/products/productsSlice';
import GalleryModal from '@/features/elements/GalleryModal';

const ProductDetails = () => {
  const dispatch = useDispatch();
  return (
    <>
      <Container>
        <div className="grid grid-cols md:grid-cols-2 gap-5 pb-10">
          <div>
            <GallerySlider
              onFullScreen={() => dispatch(toggleGalleryModal(true))}
            />
          </div>
          <div className={'px-5'}>
            <ProductDetailsColumn />
          </div>
        </div>
      </Container>
      <GalleryModal />
    </>
  );
};

export default ProductDetails;
