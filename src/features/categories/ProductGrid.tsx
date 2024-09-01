'use client';

import { useDispatch, useSelector } from 'react-redux';
import Container from '@/components/Container';
import CategoryFilterToggle from '@/components/Filters/CategoryFilterToggle';
import ProductCardBoxed from '@/components/Cards/ProductCardBoxed';
import Button from '@/components/Button';
import CategoryFilterDrawer from './CategoryFilterDrawer';
import PreviewModal from '../elements/PreviewModal';
import { handleMoreProduct, selectProducts, togglePreviewModal } from '@/store/slices/products/productsSlice';
import GalleryModal from '../elements/GalleryModal';
import { Product } from '@/types/product';
import { useFetchFilteredProductsMutation } from '@/store/api/productApi';

const ProductGrid = () => {
  const [fetchFilteredProducts] = useFetchFilteredProductsMutation()
  const { filterKey, products, sizeFilter, currentPage, limitFilter, categoriesFilter, sortByFilter, colorFilter, priceRangeFilter } = useSelector(selectProducts);
  const dispatch = useDispatch();

  const fetchMoreProducts = async () => {
    try {
      if (products.length == currentPage * limitFilter) {

        let skipData = currentPage * limitFilter

        const filter = {
          "filters": {
            "categories": categoriesFilter,
            "sort": sortByFilter,
            "color": colorFilter,
            "size": sizeFilter,
            "priceRange": `1-${priceRangeFilter}`
          },
          "pagination": {
            "skip": skipData,
            "limit": limitFilter
          }
        }
        await fetchFilteredProducts(filter).unwrap();
        dispatch(handleMoreProduct())
      }

    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  return (
    <>
      <Container className="mt-5">
        <CategoryFilterToggle />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-5 gap-5">
          {products.map((item: Product) => (
            <ProductCardBoxed
              key={item.id}
              {...item}
              onPreview={() => dispatch(togglePreviewModal(true))}
            />
          ))}
        </div>
        <div className="mt-10 mb-10">
          {
            products.length == currentPage * limitFilter && <Button className="mx-auto" onClick={fetchMoreProducts}>
              More Products <i className="las la-sync ml-2"></i>
            </Button>
          }
        </div>
        <PreviewModal />
        <GalleryModal />
      </Container>
      <CategoryFilterDrawer />
    </>
  );
};

export default ProductGrid;
