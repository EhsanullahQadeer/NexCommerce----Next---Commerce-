import Button from '@/components/Button';
import { ColumnHeaders } from '@/components/Table';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

export interface Cart {
  url: string;
  title: string;
  price: number;
  quantity: number;
  total: number;
}

export const tableHeader: ColumnHeaders[] = [
  {
    key: 'url',
    title: 'Product',
    renderCell: (cell) =>
      cell.url && (
        <div className="flex items-center justify-center lg:justify-start">
          <Image
            src={cell?.url as string}
            alt="Product image"
            height={60}
            width={60}
          />
          <Link
            href="/products"
            className="ml-7 text-black-75 text-base font-light hover:text-primary"
          >
            {cell?.title}
          </Link>
        </div>
      ),
  },
  {
    key: 'price',
    title: 'Price',
    renderCell: (cell: any) => (
      <div className="w-full text-black-75 pt-2 lg:pt-0">
        ${cell?.price?.toFixed(2)}
      </div>
    ),
    class: 'w-[120px]',
  },
  {
    key: 'status',
    title: 'Stock Status',
    renderCell: (cell: any) => {
      const isOutOfStock = cell?.status === 'Out of stock';
      return (
        <span className={cn('inline-block font-light mt-3 mb-5 lg:my-0', isOutOfStock ? 'text-[#ef837b]' : 'text-[#a6c76c]')}>
          {cell?.status}
        </span>
      )
    },
    class: 'w-[160px]',
  },
  {
    key: 'actions',
    title: '',
    renderCell: (cell: any) => {
      const isDisabled = cell?.status === 'Out of stock';
      return (
      <Button
        variant={isDisabled ? 'disabled' : 'outlined'}
        className="!w-full !max-w-[220px] justify-center mx-auto"
      >
        {!isDisabled && <i className="las la-cart-plus mr-2.5"></i>}
        {isDisabled ? 'Out of stock' : 'Add to cart'}
      </Button>
    )},
    class: 'w-[200px]'
  },
  {
    key: 'actions',
    title: '',
    renderCell: () => (
      <div className="w-[30px] h-[30px] absolute top-4 right-4 lg:right-[unset] lg:top-[unset] text-right ml-auto lg:relative">
        <i className="las la-times text-[17px] text-black-600 hover:text-black-75 cursor-pointer"></i>
      </div>
    ),
    class: 'w-[38px]'
  },
];

export const data = [
  {
    url: '/products/product-1.jpg',
    title: 'Beige knitted elastic runner shoes',
    price: 84,
    status: 'In stock',
  },
  {
    url: '/products/product-2.jpg',
    title: 'Blue utility pinafore denim dress',
    price: 84,
    status: 'In stock',
  },
  {
    url: '/products/product-2.jpg',
    title: 'Blue utility pinafore denim dress',
    price: 84,
    status: 'Out of stock',
  },
];
