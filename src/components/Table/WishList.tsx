'use client';
import { cn } from '@/lib/utils';
import { selectCart } from '@/store/slices/cart/cartSlice';
import { selectWishlist, WishlistItem } from '@/store/slices/wishlist/wishlistSlice';
import Image from 'next/image';
import Link from 'next/link';
import { FC, Key, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import Button from '../Button';
import { RootState } from '@/store';
import { useAddToCartMutation, useCartDetailsGetMutation } from '@/store/api/cartApi';
import { useAddRemoveToWishlistMutation, useWishlistDetailsGetMutation } from '@/store/api/wishlistApi';

export type ColumnHeaders = {
  key: string;
  title: string;
  renderCell?: (cell: TableData, header: ColumnHeaders) => ReactNode;
  renderHeader?: (header: ColumnHeaders) => ReactNode;
  class?: string;
};

type TableData = {
  [key: string]: string | number | boolean | any;
};

interface TableProps {
  headers: ColumnHeaders[];
  className?: string;
}

const WishList: FC<TableProps> = ({ headers, className }) => {
  const { wishListData } = useSelector(selectWishlist)
  const { user } = useSelector((state: RootState) => state.auth);
  const [addToCart] = useAddToCartMutation()
  const [cartDetailsGet] = useCartDetailsGetMutation()
  const [addRemoveToWishlist] = useAddRemoveToWishlistMutation()
  const [wishlistDetailsGet] = useWishlistDetailsGetMutation()

  const handleFetchWishlist = async () => {
    try {
      if (user?.id) {
        await wishlistDetailsGet({ user_id: user?.id }).unwrap();
      }
    } catch (error) {
      // console.error("Failed to fetch products:", error);
    }
  };

  const addToWishListHandler = async (item: WishlistItem) => {
    try {
      const addToWishList = { "user_id": user.id, product_id: item.product_id, variant_id: item.product_variant_id }

      await addRemoveToWishlist(addToWishList).unwrap();
      handleFetchWishlist()

    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const handleFetchCart = async () => {
    try {
      if (user?.id) {

        await cartDetailsGet({ user_id: user?.id }).unwrap();
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const addToCartHandler = async (item: WishlistItem) => {
    try {
      const addToCartDetails = { "user_id": user.id, products: [{ "product_id": item.product_id, "variant_id": item.product_variant_id, "price": item.product?.price, "quantity": "1" }] }

      await addToCart(addToCartDetails).unwrap();
      addToWishListHandler(item)
      handleFetchCart()

    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };



  return (
    <table
      className={cn(
        'table-auto w-full border border-black-300 lg:border-0',
        className
      )}
    >
      <thead className="hidden lg:table-header-group">
        <tr className="border-b border-black-300">
          <th
            className={cn(
              'text-black-200 text-sm font-light leading-[1.5] py-[14px] text-left',
              '!block lg:!table-cell'
            )}
          >
            Product
          </th>
          <th
            className={cn(
              'text-black-200 text-sm font-light leading-[1.5] py-[14px] text-left',
              '!block lg:!table-cell',
              'w-[120px]'
            )}
          >
            Price
          </th>
          <th
            className={cn(
              'text-black-200 text-sm font-light leading-[1.5] py-[14px] text-left',
              '!block lg:!table-cell',
              'w-[135px]'
            )}
          >
          </th>
          <th
            className={cn(
              'text-black-200 text-sm font-light leading-[1.5] py-[14px] text-left',
              '!block lg:!table-cell'
            )}
          >

          </th>
        </tr>
      </thead>
      <tbody>
        {wishListData?.map((item: WishlistItem, index: Key | null | undefined) => (
          <tr
            key={index}
            className="relative block lg:table-row border-b border-black-300 py-[42px] lg:py-0"
          >
            <td
              className="px-[30px] lg:px-0 py-0 lg:py-[30px] !block w-full lg:w-auto text-center lg:text-left lg:!table-cell"
            >
              {
                item?.product?.image
                && (
                  <div className="flex items-center justify-center lg:justify-start">
                    <Image
                      src={item?.product?.image}
                      alt="Product image"
                      height={60}
                      width={60}
                    />
                    <Link
                      href="/products"
                      className="ml-7 text-black-75 text-base font-light hover:text-primary"
                    >
                      {item?.product?.name}
                    </Link>
                  </div>
                )
              }
            </td>
            <td
              className="px-[30px] lg:px-0 py-0 lg:py-[30px] !block w-full lg:w-auto text-center lg:text-left lg:!table-cell"
            >
              <div className="w-full text-black-75 pt-2 lg:pt-0">${item?.product?.price?.toFixed(2)}</div>
            </td>
            <td className='px-[30px] lg:px-0 py-0 lg:py-[30px] !block w-full lg:w-auto text-center lg:text-left lg:!table-cell'>
              <div className='flex justify-center w-full lg:justify-start pt-2 lg:pt-0'>
                <Button
                  variant={item.product_variant.stock == 0 ? 'disabled' : 'outlined'}
                  className="!w-full !max-w-[220px] justify-center mx-auto"
                  onClick={() => addToCartHandler(item)}
                >
                  {item.product_variant.stock == 0 && <i className="las la-cart-plus mr-2.5"></i>}
                  {item.product_variant.stock == 0 ? 'Out of stock' :  "Add to cart"}
                </Button>
              </div>
            </td>
            <td> <button className="w-[38px] absolute top-4 right-4 lg:right-[unset] lg:top-[unset] lg:relative" onClick={() => addToWishListHandler(item)}>
              <i className="las la-times text-[17px] text-black-600 hover:text-black-75 cursor-pointer"></i>
            </button></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default WishList;
