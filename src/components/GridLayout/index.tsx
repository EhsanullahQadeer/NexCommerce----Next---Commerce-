'use client';

import React, { useEffect, useRef } from 'react';
import Isotope from 'isotope-layout';
import ProductCard from '../Cards/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import {
  addQuickViewProduct,
  handleMoreProduct,
  selectProducts,
  togglePreviewModal,
} from '@/store/slices/products/productsSlice';
import { cn } from '@/lib/utils';
import { useImagesLoaded } from '@/hooks/useImagesLoaded';
import Button from '../Button';
import { Product } from '@/types/product';
import ProductCardSkeleton from '../Cards/ProductCardSkeleton';
import { useFetchFilteredProductsMutation } from '@/store/api/productApi';
import { useRouter } from 'next/navigation';

const createCatFilter = (item: any) => {
  if (item && item.length) {
    return "cat-" + item[0].category_id
  }

  return "cat-0"
}

const GridLayout: React.FC = () => {
  const router = useRouter()
  const isotope = useRef<Isotope | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const imagesLoaded = useImagesLoaded(gridRef);
  const { filterKey, products, productCategories, currentPage, limitFilter, categoriesFilter, sortByFilter, colorFilter, priceRangeFilter } = useSelector(selectProducts);

  const [fetchFilteredProducts] = useFetchFilteredProductsMutation()
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

    const handleResize = () => {
      isotope.current?.layout();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      isotope.current?.destroy();
      isotope.current = null;
    };
  }, [products, filterKey, productCategories]);


  useEffect(() => {
    if (isotope.current) {
      isotope.current.arrange({
        filter: filterKey !== '*' ? `.${filterKey}` : '*',
      });
    }
  }, [products, filterKey, productCategories]);

  const fetchMoreProducts = async () => {
    try {
      if (products.length == currentPage * limitFilter) {

        let skipData = currentPage * limitFilter

        const filter = {
          "filters": {
            "categories": categoriesFilter,
            "sort": sortByFilter,
            "color": colorFilter,
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

  if (!imagesLoaded) {
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
              createCatFilter(item.product_categories)
            )}
          >
            <ProductCard
              {...item}
              onPreview={() => { dispatch(togglePreviewModal(true)); dispatch(addQuickViewProduct(item)) }}
            />
          </div>
        ))}
      </div>

      <div className="mt-10 mb-10">
        {/* {
          products.length == currentPage * limitFilter && <Button className="mx-auto" onClick={fetchMoreProducts}>
            More Products <i className="las la-sync ml-2"></i>
          </Button>
        } */}
        
        {
          products.length == currentPage * limitFilter && <Button className="mx-auto" onClick={() => router.push("/products")}>
            More Products <i className="las la-sync ml-2"></i>
          </Button>
        }

      </div>
    </div>
  );
};

export default GridLayout;
