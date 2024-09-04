'use client';
import Button from '@/components/Button';
import LinkButton from './LinkButton';
import { FC } from 'react';
import { cn } from '@/lib/utils';
import { useSelector } from 'react-redux';
import { useAddToCartMutation, useCartDetailsGetMutation } from '@/store/api/cartApi';
import { selectProducts } from '@/store/slices/products/productsSlice';
import { RootState } from '@/store';
import { useAddRemoveToWishlistMutation, useWishlistDetailsGetMutation } from '@/store/api/wishlistApi';
import { selectWishlist } from '@/store/slices/wishlist/wishlistSlice';

interface ActionsProps {
  isModal?: boolean;
}

const Actions: FC<ActionsProps> = ({ isModal }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { quickViewProduct, currentVarient } = useSelector(selectProducts);
  const { product_variants } = quickViewProduct || {}
  const { wishListData } = useSelector(selectWishlist)
  const [addToCart] = useAddToCartMutation()
  const [addRemoveToWishlist] = useAddRemoveToWishlistMutation()
  const [wishlistDetailsGet] = useWishlistDetailsGetMutation()
  const [cartDetailsGet] = useCartDetailsGetMutation()
  const handleFetchCart = async () => {
    try {
      if (user?.id) {

        await cartDetailsGet({ user_id: user?.id }).unwrap();
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const addToCartHandler = async () => {
    try {
      const addToCartDetails = { "user_id": user.id, products: [{ "product_id": quickViewProduct?.id, "variant_id": currentVarient?.id, "price": currentVarient?.price, "quantity": "1" }] }

      await addToCart(addToCartDetails).unwrap();
      handleFetchCart()

    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const handleFetchWishlist = async () => {
    try {
      if (user?.id) {
        await wishlistDetailsGet({ user_id: user?.id }).unwrap();
      }
    } catch (error) {
      // console.error("Failed to fetch products:", error);
    }
  };

  const addToWishListHandler = async (id: number) => {
    try {
      // const addToWishList = { "user_id": user.id, product_id: id }
      const addToWishList = { "user_id": user.id, product_id: id, variant_id: currentVarient?.id }

      await addRemoveToWishlist(addToWishList).unwrap();
      handleFetchWishlist()

    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const checkInWishlist = (): boolean => {

    return !!wishListData.find(el => {
      return el.product_id === quickViewProduct?.id && el.product_variant_id === currentVarient?.id
    })
  }

  return (
    <div
      className={cn(
        !isModal &&
        'flex justify-between items-start lg:items-center flex-col-reverse lg:flex-row-reverse mt-5 mb-5 gap-5'
      )}
    >
      <div
        className={cn(
          'flex items-center',
          isModal ? 'mt-[50px] mb-10' : 'gap-4'
        )}
      >
        {
          !!quickViewProduct?.id && <button className='m-auto' onClick={() => addToWishListHandler(quickViewProduct?.id)}><LinkButton url="#" label={!checkInWishlist() ? "Add Wishlist" : "Remove Wishlist"} icon={!checkInWishlist() ? "lar la-heart" : "las la-heart"} /></button>
        }
        {/* <LinkButton
          url="#"
          label="Add to Compare"
          icon="las la-random"
          className={cn(
            !isModal && 'pl-4 border-l border-border-dotted border-[#e5e5e5]'
          )}
        /> */}
      </div>

      <div className={cn(isModal ? 'mb-10' : 'w-full')}>
        <Button
          className={cn(
            '!justify-center uppercase !w-full',
            isModal ? 'h-[44px] !tracking-[1.4px]' : '!max-w-[198px]'
          )}
          variant="outlined"
          onClick={addToCartHandler}
        >
          <i className="las la-cart-plus mr-1 text-lg"></i>Add to cart
        </Button>
      </div>
    </div>
  );
};

export default Actions;
