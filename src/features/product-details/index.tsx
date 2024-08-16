import { useDispatch } from 'react-redux';
import Container from '@/components/Container';
import GallerySlider from '@/components/Slider/GallerySlider';
import ProductDetailsColumn from './ProductDetailsColumn';
import { toggleGalleryModal } from '@/store/slices/products/productsSlice';
import GalleryModal from '@/features/elements/GalleryModal';
import ProductSlider from './ProductSlider';
import Tabs from '@/components/Tabs';
import TabDescription from './DescriptionTab';
import { additionalInformation, description, shipping } from './data';
import ReviewsTab from './ReviewsTab';

const tabs = [
  {
    label: 'Description',
    content: <TabDescription details={description} />,
  },
  {
    label: 'Additional Information',
    content: <TabDescription details={additionalInformation} />,
  },
  {
    label: 'Shipping & Returns',
    content: <TabDescription details={shipping} />,
  },
  {
    label: 'Reviews (2)',
    content: <ReviewsTab />,
  },
];

const ProductDetails = () => {
  const dispatch = useDispatch();
  return (
    <>
      <Container>
        <div className="grid grid-cols md:grid-cols-2 gap-5 pb-10">
          <div className="[&_.swiper]:max-h-[470px]">
            <GallerySlider
              onFullScreen={() => dispatch(toggleGalleryModal(true))}
            />
          </div>
          <div>
            <ProductDetailsColumn />
          </div>
        </div>
        <div className="my-[50px]">
          <Tabs tabs={tabs} />
        </div>
        <ProductSlider />
      </Container>
      <GalleryModal />
    </>
  );
};

export default ProductDetails;
