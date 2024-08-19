import NumberInput from '@/components/NumberInput/NumberInput';
import { ColumnHeaders } from '@/components/Table';
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
      <div className="w-full text-black-75 pt-2 lg:pt-0">${cell?.price?.toFixed(2)}</div>
    ),
    class: 'w-[120px]'
  },
  {
    key: 'quantity',
    title: 'Quantity',
    renderCell: (cell: any) => (
      <div className='flex justify-center w-full lg:justify-start pt-2 lg:pt-0'>
        <NumberInput
          value={cell?.quantity}
          inputClass="!max-w-[100px]"
          className="!max-w-[100px]"
        />
      </div>
    ),
    class: 'w-[135px]'
  },
  {
    key: 'total',
    title: 'Total',
    renderCell: (cell: any) => (
      <div className="w-full lg:w-[80px] text-primary text-base pt-2 lg:pt-0">
        ${cell?.price?.toFixed(2)}
      </div>
    ),
  },
  {
    key: 'actions',
    title: '',
    renderCell: () => (
      <div className="w-[38px] absolute top-4 right-4 lg:right-[unset] lg:top-[unset] lg:relative">
        <i className="las la-times text-[17px] text-black-600 hover:text-black-75 cursor-pointer"></i>
      </div>
    ),
  },
];

export const data = [
  {
    url: '/products/product-1.jpg',
    title: 'Beige knitted elastic runner shoes',
    price: 84,
    quantity: 1,
    total: 84,
  },
  {
    url: '/products/product-2.jpg',
    title: 'Blue utility pinafore denim dress',
    price: 84,
    quantity: 1,
    total: 84,
  },
];
