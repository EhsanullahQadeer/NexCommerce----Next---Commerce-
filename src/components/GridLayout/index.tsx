'use client';

import React, { Suspense, useEffect, useRef } from 'react';
import Isotope from 'isotope-layout';
import ProductCard from '../Cards/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectProducts,
  togglePreviewModal,
} from '@/store/slices/products/productsSlice';
import { cn } from '@/lib/utils';
import { useImagesLoaded } from '@/hooks/useImagesLoaded';
import Button from '../Button';
import { Product } from '@/types/product';
import ProductCardSkeleton from '../Cards/ProductCardSkeleton';

const GridLayout: React.FC = () => {
  const isotope = useRef<Isotope | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const imagesLoaded = useImagesLoaded(gridRef);
  const { filterKey, products } = useSelector(selectProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    if (imagesLoaded && gridRef.current && !isotope.current) {
      isotope.current = new Isotope(gridRef.current, {
        itemSelector: '.product-item',
        layoutMode: 'fitRows',
        fitRows: {
          gutter: 0,
        },
      });
    }

    const handleResize = () => isotope.current?.reloadItems();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      isotope.current?.destroy();
      isotope.current = null;
    };
  }, [imagesLoaded]);

  useEffect(() => {
    if (isotope.current) {
      isotope.current.arrange({
        filter: filterKey !== '*' ? `.${filterKey}` : '*',
      });
    }
  }, [filterKey]);

  if(!imagesLoaded) {
    return <ProductCardSkeleton />
  }

  return (
    <div className="bg-white">
        <div ref={gridRef} className="!relative mt-5">
          {products.map((item: Product) => (
            <div
              key={item.id}
              className={cn(
                'product-item p-2.5 float-left w-full max-w-full xs:max-w-[50%] md:max-w-[33.33%] lg:max-w-[25%]',
                item.category
              )}
            >
              <ProductCard
                {...item}
                onPreview={() => dispatch(togglePreviewModal(true))}
              />
            </div>
          ))}
        </div>
        <div className="mt-10 mb-10">
          <Button className="mx-auto">
            More Products <i className="las la-sync ml-2"></i>
          </Button>
        </div>
    </div>
  );
};

export default GridLayout;
