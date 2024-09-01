'use client';

import { useDispatch, useSelector } from 'react-redux';
import Container from '@/components/Container';
import CategoryFilterToggle from '@/components/Filters/CategoryFilterToggle';
import ProductCardBoxed from '@/components/Cards/ProductCardBoxed';
import Button from '@/components/Button';
import CategoryFilterDrawer from './CategoryFilterDrawer';
import PreviewModal from '../elements/PreviewModal';
import { selectProducts, togglePreviewModal } from '@/store/slices/products/productsSlice';
import GalleryModal from '../elements/GalleryModal';
import { Product } from '@/types/product';

const ProductGrid = () => {
  const dispatch = useDispatch();
  const { products } = useSelector(selectProducts);
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
          <Button className="mx-auto">
            More Products <i className="las la-sync ml-2"></i>
          </Button>
        </div>
        <PreviewModal />
        <GalleryModal />
      </Container>
      <CategoryFilterDrawer />
    </>
  );
};

export default ProductGrid;
