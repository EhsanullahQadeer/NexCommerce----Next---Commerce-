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
import { baseUrl } from "@/config/config";
import Skeleton from "react-loading-skeleton";
interface ProductDetailsProps {
  productData: Product | null;
  isLoading: boolean;
}

const ProductDetails = ({ productData, isLoading }: ProductDetailsProps) => {
  const { images, image, product_categories } = productData || {};
  const imagesLinks = images?.map((el: any) => baseUrl + el.image_path) || [];
  const { quickViewProduct } = useSelector(selectProducts);
  const { reviews } = quickViewProduct || {};
  const tabLabels = [
    "Description",
    "Additional Information",
    "Shipping & Returns",
  ];

  const tabs = useMemo(
    () => [
      ...tabLabels.map((label) => ({
        label,
        content: <TabDescription label={label} />,
      })),
      {
        label: `Reviews (${reviews?.length || 0})`,
        content: <ReviewsTab />,
      },
    ],
    [quickViewProduct, reviews]
  );

  const dispatch = useDispatch();
  return (
    <Container>
      <div className="grid grid-cols md:grid-cols-2 gap-5 pb-10">
        <div className="[&_.swiper]:max-h-[470px]">
          {isLoading ? (
            <Skeleton height={470} />
          ) : (
            <GallerySlider
              images={imagesLinks.length ? imagesLinks : [image]}
              onFullScreen={() => dispatch(toggleGalleryModal(true))}
            />
          )}
        </div>

        <div>
          {isLoading ? (
            <div className="flex flex-col gap-2">
              <Skeleton height={20} width={80} />
              <Skeleton height={15} width={120} />
              <Skeleton height={25} width={100} />
              <Skeleton height={10} width={"100%"} count={2} />
              <Skeleton height={40} width={200} />
              <div className="flex justify-between items-center">
                <Skeleton height={37} width={198} />
                <Skeleton height={18} width={108} />
              </div>
              <Skeleton className="my-4" height={1} width={"100%"} />
            </div>
          ) : (
            <ProductDetailsColumn />
          )}
        </div>
      </div>

      <div className="my-[50px]">
        <Tabs tabs={tabs} isLoading={isLoading} />
      </div>

      {isLoading ? (
        <Skeleton height={300} width={"100%"} />
      ) : (
        productData && (
          <ProductSlider product_categories={productData.product_categories} />
        )
      )}
    </Container>
  );
};

export default ProductDetails;
