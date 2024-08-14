'use client';

import { useDispatch, useSelector } from 'react-redux';
import Container from '@/components/Container';
import CategoryFilterToggle from '@/components/Filters/CategoryFilterToggle';
import { Product } from '@/store/slices/products/fakeProducts';
import ProductCardBoxed from '@/components/Cards/ProductCardBoxed';
import { products } from '@/store/slices/categories/fakeProducts';
import Button from '@/components/Button';
import CategoryFilterDrawer from './CategoryFilterDrawer';
import PreviewModal from '../Product/categories/PreviewModal';
import { togglePreviewModal } from '@/store/slices/products/productsSlice';
import GalleryModal from '../Product/categories/GalleryModal';

const ProductGrid = () => {
  const dispatch = useDispatch();
  return (
    <Container className="mt-5">
      <CategoryFilterToggle />
      <CategoryFilterDrawer />
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
  );
};

export default ProductGrid;
