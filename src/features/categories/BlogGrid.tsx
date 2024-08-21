'use client';

import { useDispatch, useSelector } from 'react-redux';
import Container from '@/components/Container';
import ProductCardBoxed from '@/components/Cards/ProductCardBoxed';
import { products } from '@/store/slices/categories/fakeProducts';
import Button from '@/components/Button';
import CategoryFilterDrawer from './CategoryFilterDrawer';
import PreviewModal from '../elements/PreviewModal';
import { togglePreviewModal } from '@/store/slices/products/productsSlice';
import GalleryModal from '../elements/GalleryModal';
import { Product } from '@/types/product';
import BlogTabs from '@/components/Tabs/BlogTabs';
import BlogCard from '@/components/Cards/BlogCard';

const tabs = [
  {
    label: { text: 'All Blog Posts', availableItems: 8 },
    content: <h1>Description</h1>,
  },
  {
    label: { text: 'Lifestyle', availableItems: 3 },
    content: <h1>Additional Information</h1>,
  },
  {
    label: { text: 'Shopping', availableItems: 1 },
    content: <h1>Shipping & Returns</h1>,
  },
  {
    label: { text: 'Fashion', availableItems: 2 },
    content: <h1>Reviews (2)</h1>,
  },
  {
    label: { text: 'Travel', availableItems: 3 },
    content: <h1>Reviews (2)</h1>,
  },
  {
    label: { text: 'Hobbies', availableItems: 2 },
    content: <h1>Reviews (2)</h1>,
  },
];

const BlogGrid = () => {
  const dispatch = useDispatch();
  return (
    <>
      <Container className="mt-5">
        <BlogTabs tabs={tabs} />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-5 gap-5">
          {products.map((item: Product) => (
            <BlogCard
              key={item.id}
              {...item}
              onPreview={() => dispatch(togglePreviewModal(true))}
            />
          ))}
        </div>
        {/* <div className="mt-10 mb-10">
          <Button className="mx-auto">
            More Products <i className="las la-sync ml-2"></i>
          </Button>
        </div> */}
      </Container>
      <CategoryFilterDrawer />
    </>
  );
};

export default BlogGrid;
