import { useDispatch } from 'react-redux';
import Container from '@/components/Container';
import GallerySlider from '@/components/Slider/GallerySlider';
import ProductDetailsColumn from './ProductDetailsColumn';
import { toggleGalleryModal } from '@/store/slices/products/productsSlice';
import ProductSlider from './ProductSlider';
import Tabs from '@/components/Tabs';
import TabDescription from './DescriptionTab';
import { additionalInformation, description, images, shipping } from './data';
import ReviewsTab from './ReviewsTab';
import { Product } from '@/types/product';



const tabs = [
  {
    label: 'Description',
    content: <TabDescription label='Description' details={description} />,
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

interface ProductDetailsProps {
  productData: Product 
}

const ProductDetails = ({ productData }: ProductDetailsProps ) => {
  const { images, image,product_categories } = productData || {}
  const imagesLinks = images?.map((el:any) => el.images) || []

  const dispatch = useDispatch();
  return (
    <>
      <Container>
        <div className="grid grid-cols md:grid-cols-2 gap-5 pb-10">
          <div className="[&_.swiper]:max-h-[470px]">
          <GallerySlider
            images={imagesLinks?.length ? [images || "", ...imagesLinks] : [productData.image || ""]}
            onFullScreen={() => dispatch(toggleGalleryModal(true))}
          />
          </div>
          <div>
            <ProductDetailsColumn  productData={productData}/>
          </div>
        </div>
        <div className="my-[50px]">
          <Tabs tabs={tabs} />
        </div>
        <ProductSlider product_categories={product_categories} />
      </Container>
    </>
  );
};

export default ProductDetails;
