import { useDispatch, useSelector } from "react-redux";
import Container from "@/components/Container";
import GallerySlider from "@/components/Slider/GallerySlider";
import ProductDetailsColumn from "./ProductDetailsColumn";
import {
  selectProducts,
  toggleGalleryModal,
} from "@/store/slices/products/productsSlice";
import ProductSlider from "./ProductSlider";
import Tabs from "@/components/Tabs";
import TabDescription from "./DescriptionTab";
import { additionalInformation, description, images, shipping } from "./data";
import ReviewsTab from "./ReviewsTab";
import { Product } from "@/types/product";
import { useMemo } from "react";

interface ProductDetailsProps {
  productData: Product;
}

const ProductDetails = ({ productData }: ProductDetailsProps) => {
  const { images, image, product_categories } = productData || {};
  const imagesLinks = images?.map((el: any) => el.images) || [];
  const { quickViewProduct } = useSelector(selectProducts);
  const { reviews } = quickViewProduct || {};
  const tabLabels = ["Description", "Additional Information", "Shipping & Returns"];

const tabs = useMemo(() => [
    ...tabLabels.map(label => ({
        label,
        content: <TabDescription label={label} />,
    })),
    {
        label: `Reviews (${reviews?.length || 0})`,
        content: <ReviewsTab />,
    },
], [quickViewProduct, reviews]);

  const dispatch = useDispatch();
  return (
    <>
      <Container>
        <div className="grid grid-cols md:grid-cols-2 gap-5 pb-10">
          <div className="[&_.swiper]:max-h-[470px]">
            <GallerySlider
              images={
                imagesLinks?.length
                  ? [images || "", ...imagesLinks]
                  : [productData.image || ""]
              }
              onFullScreen={() => dispatch(toggleGalleryModal(true))}
            />
          </div>
          <div>
            <ProductDetailsColumn productData={productData} />
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
