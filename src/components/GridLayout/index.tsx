'use client';

import React, { useEffect, useRef, useState } from 'react';
import Isotope from 'isotope-layout';
import ProductCard from '../Cards/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectProducts,
  togglePreviewModal,
} from '@/store/slices/products/productsSlice';
import { Product } from '@/store/slices/products/fakeProducts';
import { cn } from '@/lib/utils';

const GridLayout: React.FC = () => {
  const isotope = useRef<Isotope | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const { filterKey, products } = useSelector(selectProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    if (gridRef.current) {
      isotope.current = new Isotope(gridRef.current, {
        itemSelector: '.product-item',
        layoutMode: 'fitRows',
        masonry: {
          columnWidth: '.grid-sizer',
          gutter: 20,
        },
      });
    }

    return () => {
      isotope.current?.destroy();
      isotope.current = null;
    };
  }, []);

  useEffect(() => {
    if (isotope.current) {
      isotope.current.arrange({
        filter: filterKey !== '*' ? `.${filterKey}` : '*',
      });
    }
  }, [filterKey]);

  return (
    <div className="bg-white">
      <div
        ref={gridRef}
        className="grid-container !relative grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 !gap-5 mt-5"
      >
        <div className="grid-sizer"></div>
        {products.map((item: Product) => (
          <div
            key={item.id}
            className={cn('product-item p-2.5', item.category)}
          >
            <div className="min-w-[277px] h-auto">
              <ProductCard
                {...item}
                onPreview={() => dispatch(togglePreviewModal(true))}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GridLayout;
