import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import {
  overlayLinkStyles,
  overlayStyles,
  shopBtnStyles,
  titleStyles,
  transition,
} from './cardComponentStyles';
import { ProductCategory } from '@/types/product';
import { useDispatch } from 'react-redux';
import { clearFilter, handleCategoriesFilter, selectCategoryFilter } from '@/store/slices/products/productsSlice';
import { useRouter } from 'next/navigation';

const CardComponent: FC<ProductCategory> = ({
  image,
  name,
  products_count,
  id
}) => {
  const route = useRouter()
  const dispatch = useDispatch()
  const filterCategoryhandler = () => {
    dispatch(clearFilter())
    dispatch(selectCategoryFilter(id))
    route.push("/products")
  }

  return (
    <div className={cn('group relative', "")}>
      <button onClick={(filterCategoryhandler)}>
        <Image
          fill
          src={image}
          alt="product card"
          className="!relative !w-full !h-auto"
        />
        <div className={cn(overlayStyles, transition)} />
      </button>
      <button className={cn(overlayLinkStyles, transition)} onClick={(filterCategoryhandler)}>
        <h3
          className={cn(
            titleStyles,
            transition,
            'group-hover/link:opacity-0 group-hover/link:invisible group-hover/link:translate-y-full'
          )}
        >
          {name}
        </h3>
        <h4
          className={cn(
            'text-black-500 text-sm font-light leading-[16.8px]',
            transition,
            'group-hover/link:opacity-0 group-hover/link:invisible group-hover/link:translate-y-full'
          )}
        >
          {products_count} Products
        </h4>
        <span
          className={cn(
            shopBtnStyles,
            transition,
            'group-hover/link:opacity-100 group-hover/link:visible group-hover/link:translate-y-0'
          )}
        >
          Shop now
        </span>
      </button>
    </div>
  );
};

export default CardComponent;
