'use client';
import { cn } from '@/lib/utils';
import { CartItem, selectCart } from '@/store/slices/cart/cartSlice';
import Image from 'next/image';
import Link from 'next/link';
import { FC, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import NumberInput from '../NumberInput/NumberInput';
import { useAddToCartMutation, useCartDetailsGetMutation, useDeletefromCartMutation } from '@/store/api/cartApi';
import { RootState } from '@/store';

export type ColumnHeaders = {
  key: string;
  title: string;
  renderCell?: (cell: TableData, header: ColumnHeaders) => ReactNode;
  renderHeader?: (header: ColumnHeaders, onClick?: () => void) => ReactNode;
  class?: string;
};

type TableData = {
  [key: string]: string | number | boolean | any;
};

interface TableProps {
  headers: ColumnHeaders[];
  className?: string;
}

const Table: FC<TableProps> = ({ headers, className }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { cartDetails } = useSelector(selectCart)
  const [addToCart] = useAddToCartMutation()
  const [cartDetailsGet] = useCartDetailsGetMutation()
  const [deletefromCart] = useDeletefromCartMutation()

  const handleFetchCart = async () => {
    try {
      if (user?.id) {

        await cartDetailsGet({ user_id: user?.id }).unwrap();
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const handleCartItemChanges = async (type: string, item: CartItem) => {
    try {
      console.log("item", item);

      let newQuantity = 0

      if (type == "decrement") {
        newQuantity = item?.quantity == 1 ? 0 : -1
      }
      if (type == "increment") {
        newQuantity = 1
      }

      if (newQuantity == 0) {
        await deletefromCart({ user_id: user.id, product_id: item?.product_id, variant_id: item.variant_id }).unwrap();
      } else {
        const addToCartDetails = { "user_id": user.id, products: [{ "product_id": item?.product_id, "variant_id": item.variant_id, "price": item.price_at_purchase, "quantity": newQuantity }] }

        await addToCart(addToCartDetails).unwrap();
      }

      handleFetchCart()

    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  }

  const handleCartItemDelete = async (item: CartItem) => {
    try {
      await deletefromCart({ user_id: user.id, product_id: item?.product_id, variant_id: item.variant_id }).unwrap();

      handleFetchCart()

    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  }

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
            Quantity
          </th>
          <th
            className={cn(
              'text-black-200 text-sm font-light leading-[1.5] py-[14px] text-left',
              '!block lg:!table-cell'
            )}
          >
            Total
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
        {cartDetails?.map((item, index) => (
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
                <NumberInput
                  value={item?.quantity}
                  inputClass="!max-w-[100px]"
                  className="!max-w-[100px]"
                  onChange={(type) => handleCartItemChanges(type, item)}
                />
              </div>
            </td>
            <td className='px-[30px] lg:px-0 py-0 lg:py-[30px] !block w-full lg:w-auto text-center lg:text-left lg:!table-cell'><div className="w-full lg:w-[80px] text-primary text-base pt-2 lg:pt-0">
              ${(item?.product?.price * item?.quantity).toFixed(2)}
            </div></td>
            <td> <button className="w-[38px] absolute top-4 right-4 lg:right-[unset] lg:top-[unset] lg:relative" onClick={() => handleCartItemDelete(item)}>
              <i className="las la-times text-[17px] text-black-600 hover:text-black-75 cursor-pointer"></i>
            </button></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
