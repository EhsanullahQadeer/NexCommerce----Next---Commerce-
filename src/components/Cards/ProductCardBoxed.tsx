import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { productVerticalActionStyles } from './elements/styles';
import IconWithText from '../Icons/IconWithTextOverlay';
import ReadOnlyColorVariants from '../ColorVariants/ReadOnly';
import CardPrice from './elements/CardPrice';
import Stars from '../Stars';
import CardActions from './elements/Actions';
import { ColorVariant, Product, ProductVariant } from '@/types/product';
import { useSelector } from 'react-redux';
import { useAddToCartMutation, useCartDetailsGetMutation } from '@/store/api/cartApi';
import { RootState } from '@/store';
import { useAddRemoveToWishlistMutation, useWishlistDetailsGetMutation } from '@/store/api/wishlistApi';
import { selectWishlist } from '@/store/slices/wishlist/wishlistSlice';

export interface ProductCardBoxedProps extends Product {
  className?: string;
  onPreview?: () => void;
}

const ProductCardBoxed: FC<ProductCardBoxedProps> = (productDetails) => {
  const {
    id,
    name,
    image,
    price,
    product_variants,
    className,
    onPreview,
    // heading,
  } = productDetails
  const { user } = useSelector((state: RootState) => state.auth);
  const { wishListData } = useSelector(selectWishlist)
  const [addToCart] = useAddToCartMutation()
  const [cartDetailsGet] = useCartDetailsGetMutation()
  const [addRemoveToWishlist] = useAddRemoveToWishlistMutation()
  const [wishlistDetailsGet] = useWishlistDetailsGetMutation()
  const productUrl = `/products/${id}`;

  const colorVarientFilter = (varients: ProductVariant[]) => {
    let colorsvarients: ColorVariant[] = []

    varients.map((el) => {
      el?.attribute_values?.map((item) => {
        if (item?.variant_attribute?.attribute_name == "Color" || item?.variant_attribute?.attribute_name == "Colour") {
          const checkColor = colorsvarients.find(el => el.color == item.value.toLowerCase())
          !checkColor && colorsvarients.push({ id: item.id, color: item.value.toLowerCase() })
        }
      })
    })

    return colorsvarients
  }

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
      const addToCartDetails = { "user_id": user.id, products: [{ "product_id": id, "variant_id": product_variants[0]?.id, "price": product_variants[0]?.price, "quantity": "1" }] }

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
      const addToWishList = { "user_id": user.id, product_id: id, variant_id: product_variants[0]?.id }

      await addRemoveToWishlist(addToWishList).unwrap();
      handleFetchWishlist()

    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const checkInWishlist = (): boolean => {

    return !!wishListData.find(el => {
      return el.product_id === productDetails.id && el.product_variant_id === productDetails.product_variants[0].id
    })
  }

  return (
    <div
      className={cn(
        'group relative mb-2.5 hover:shadow-[0_5px_20px_rgba(0,0,0,0.05)] h-full',
        className
      )}
    >
      <div className="relative overflow-hidden">
        <Link href={productUrl} className="relative">
          <Image
            fill
            src={image}
            alt="Product image"
            className="!relative block !w-full !h-auto min-h-[277px]"
          />
        </Link>
        {/* {label && <TagLabel label={label} />} */}

        <button className={productVerticalActionStyles} onClick={() => addToWishListHandler(id)}>
          {
            !checkInWishlist() ? <IconWithText
              icon={<i className="lar la-heart"></i>}
              text="Add Wishlist"
            /> : <IconWithText
              icon={<i className="las la-heart"></i>}
              text="Remove Wishlist"
            />
          }
        </button>

        <CardActions onPreview={onPreview} onAddToCart={addToCartHandler} />
      </div>
      <div className="py-4 px-5">
        <div className="text-gray-500 text-[13px] font-light tracking-[-0.13px] leading-[15.6px] mb-[3px]">
          {/* {heading} */}
        </div>
        <h3 className="text-base font-normal text-black-75 mb-[3px] tracking-[-0.16px] leading-[20px] mb-[2px]">
          <Link href={productUrl} className="hover:text-primary">
            {name}
          </Link>
        </h3>
        <CardPrice price={price} oldPrice={0} isBoxed />
        <div className="mb-[17px] mt-[13px]">
          <Stars count={5} reviewCount={2} />
        </div>
        <ReadOnlyColorVariants variants={colorVarientFilter(product_variants)} />
      </div>
    </div>
  );
};

export default ProductCardBoxed;
