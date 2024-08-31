'use client';

import dynamic from 'next/dynamic';
import ProductFilters from '@/components/Filters/ProductFilters';
import PreviewModal from '../elements/PreviewModal';
import GalleryModal from '../elements/GalleryModal';
import { useFetchCategoriesListMutation, useFetchProductListMutation } from '@/store/api/productApi';
import { useEffect } from 'react';

const GridLayout = dynamic(() => import('@/components/GridLayout'), { ssr: false });

const ProductCategories = () => {

  const [fetchProductList] = useFetchProductListMutation();
  const [fetchCategoriesList] = useFetchCategoriesListMutation();

  const handleFetchProducts = async (tag_name: string) => {
    try {
      await fetchProductList({ tag_name }).unwrap();
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const handleFetchCategories = async () => {
    try {
      await fetchCategoriesList({}).unwrap();
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  useEffect(() => {
    handleFetchProducts("")
    handleFetchCategories()
  }, [])


  return (
    <div>
      <div className="max-w-container mx-auto px-2.5 !pt-10">
        <ProductFilters />
      </div>
      <div className="max-w-[1208px] mx-auto px-2.5">
        <GridLayout />
      </div>
      <PreviewModal />
      <GalleryModal />
    </div>
  );
};

export default ProductCategories;
