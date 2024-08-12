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
        fitRows: {
          gutter: 0,
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
      <div ref={gridRef} className="!relative mt-5">
        {products.map((item: Product) => (
          <div
            key={item.id}
            className={cn(
              'product-item p-2.5 float-left w-full max-w-[50%] md:max-w-[33.33%] lg:max-w-[25%]',
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
    </div>
  );
};

export default GridLayout;
