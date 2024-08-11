import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import Button from '../Button';
import { Product } from '@/store/slices/products/fakeProducts';
import {
  productVerticalActionStyles,
  addToCartStyles,
  previewBtnStyles,
  addToCartLinkStyles,
} from './styles';

export interface ProductCardProps extends Product {
  className?: string;
}

const ProductCard: FC<ProductCardProps> = ({
  title,
  src,
  price,
  oldPrice,
  variants = false,
  label,
  className,
}) => {
  return (
    <div className={cn('group relative mb-2.5', className)}>
      <div className="relative overflow-hidden">
        <Link href="/products" className='relative'>
          <Image
            src={src}
            alt="Product image"
            fill
            className="!relative !w-full !h-[277px]"
            sizes='277px'
          />
        </Link>
        {label && (
          <span className="absolute text-[13px] font-extralight top-5 left-5 bg-white px-[9px] py-[5px]">
            {label}
          </span>
        )}

        <div className={productVerticalActionStyles}>
          <Link href="#" className={addToCartLinkStyles}>
            <i className="lar la-heart"></i>
            <span className={addToCartStyles}>Add to cart</span>
          </Link>
        </div>

        <div className={previewBtnStyles}>
          <Button className="w-full justify-center" variant="white">
            quick view
          </Button>
        </div>
      </div>
      <div className="pt-4 pb-5">
        <h3 className="text-sm font-extralight text-black-100 mb-[3px]">
          <Link href="/products" className="hover:text-primary">
            {title}
          </Link>
        </h3>
        {price && (
          <div className="flex text-sm font-light gap-2 items-center">
            <span className="text-primary">${price.toFixed(2)}</span>
            {oldPrice && (
              <span className="text-black-600">Was ${oldPrice.toFixed(2)}</span>
            )}
          </div>
        )}
        <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-[0.35s] ease">
          <Link
            href="#"
            className="text-sm font-extralight text-primary hover:shadow-[0_0.1rem_0_0_#cc9966] leading-[18px]"
          >
            Add to cart<i className="las la-long-arrow-alt-right ml-2.5"></i>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
