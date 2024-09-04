import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import Button from '../Button';
import {
  productVerticalActionStyles,
  previewBtnStyles,
} from './elements/styles';
import IconWithText from '../Icons/IconWithTextOverlay';
import ReadOnlyColorVariants from '../ColorVariants/ReadOnly';
// import TagLabel from './elements/TagLabel';
import CardPrice from './elements/CardPrice';
import { ColorVariant, Product, ProductVariant } from '@/types/product';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useAddToCartMutation, useCartDetailsGetMutation } from '@/store/api/cartApi';
import { useAddRemoveToWishlistMutation, useWishlistDetailsGetMutation } from '@/store/api/wishlistApi';
import { selectWishlist } from '@/store/slices/wishlist/wishlistSlice';

export interface ProductCardProps extends Product {
  className?: string;
  onPreview?: () => void;
}

const ProductCard: FC<ProductCardProps> = (productDetails) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { wishListData } = useSelector(selectWishlist)
  const [addToCart] = useAddToCartMutation()
  const [addRemoveToWishlist] = useAddRemoveToWishlistMutation()
  const [wishlistDetailsGet] = useWishlistDetailsGetMutation()
  const [cartDetailsGet] = useCartDetailsGetMutation()

  const {
    id,
    name,
    image,
    price,
    product_variants,
    className,
    onPreview,
  } = productDetails

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
      const addToCartDetails = { "user_id": user.id, products: [{ "product_id": productDetails.id, "variant_id": productDetails.product_variants[0]?.id, "price": productDetails.product_variants[0]?.price, "quantity": "1" }] }

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
    <div className={cn('group relative mb-2.5', className)}>
      <div className="relative overflow-hidden">
        <Link href={`/products/${id}`} className="relative">
          <Image
            fill
            src={image}
            alt="Product image"
            className="!relative w-full height-auto min-h-[277px]"
            blurDataURL='/default_image.jpg'
          />
        </Link>

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

        <div className={previewBtnStyles}>
          <Button
            className="w-full justify-center"
            variant="white"
            onClick={onPreview}
          >
            quick view
          </Button>
        </div>
      </div>
      <div className="pt-4 pb-5">
        <h3 className="text-sm font-extralight text-black-100 mb-[3px]">
          <Link href="/products" className="hover:text-primary">
            {name}
          </Link>
        </h3>
        <CardPrice price={price} oldPrice={0} />

        <ReadOnlyColorVariants variants={colorVarientFilter(product_variants)} />

        <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-[0.35s] ease">
          <button
            onClick={addToCartHandler}
            className="text-sm font-extralight text-primary hover:shadow-[0_0.1rem_0_0_#cc9966] leading-[18px]"
          >
            Add to cart<i className="las la-long-arrow-alt-right ml-2.5"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
