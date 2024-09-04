import { RootState } from '@/store';
import { useCartDetailsGetMutation, useDeletefromCartMutation } from '@/store/api/cartApi';
import { CartItem } from '@/store/slices/cart/cartSlice';
import Image from 'next/image';
import Link from 'next/link';
import { useSelector } from 'react-redux';

export interface cartItemProps {
  data: CartItem;
}

const CartList = ({ data }: cartItemProps) => {
  const { product, variant } = data
  const { user } = useSelector((state: RootState) => state.auth);

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

  const handleCartItemDelete = async (item: CartItem) => {
    try {
      await deletefromCart({ user_id: user.id, product_id: item?.product_id, variant_id: item.variant_id }).unwrap();

      handleFetchCart()

    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  }

  return (
    <div className="flex items-center border-b border-[#ebebeb] py-4 justify-between">
      <div>
        <Link href="/products" className="flex items-center">
          <div className="max-w-[150px]">
            <h4 className="font-light text-[13px] text-black-100 leading-[16.9px]">
              {product.name}
            </h4>
            <span className='font-light text-[13px] text-black-200'>
              <span>{data.quantity}</span>
              <span> x ${variant.price}</span>
            </span>
          </div>
        </Link>
      </div>

      <div className="flex">
        <Link href="/products" className="flex items-center">
          <Image
            src={product.image}
            height={60}
            width={60}
            alt="Product image"
          />
        </Link>
        <button onClick={() => handleCartItemDelete(data)}>
          <span className='flex h-6 w-6 items-center justify-end'>
            <i className="las la-times cursor-pointer text-[13px] text-[#cccccc]"></i>
          </span>
        </button>
      </div>

    </div>
  );
};

export default CartList;
