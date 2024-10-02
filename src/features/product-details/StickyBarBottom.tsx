import { FC, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button";
import Container from "@/components/Container";
import NumberInput from "@/components/NumberInput/NumberInput";
import { useDispatch, useSelector } from "react-redux";
import {
  changeCurrentVarientQuantity,
  selectProducts,
} from "@/store/slices/products/productsSlice";
import useCurrency from "@/hooks/useCurrency";
import Skeleton from "react-loading-skeleton";
import useCart from "@/hooks/useCart";
import useWishList from "@/hooks/useWishList";
import { GSP_NO_RETURNED_VALUE } from "next/dist/lib/constants";
interface Iprops {
  isLoading: boolean;
}
const StickyBarBottom: FC<Iprops> = (props) => {
  const { isLoading } = props;
  const dispatch = useDispatch();
  const { addToCartHandler } = useCart();
  const { addToWishListHandler, checkInWishlist } = useWishList();

  const { quickViewProduct, currentVarientQuantity } =
    useSelector(selectProducts);

  const { price, currency_id, image } = quickViewProduct || {};

  const { formatPrice } = useCurrency();

  const handleCartItemChanges = async (type: string) => {
    try {
      if (type === "decrement") {
        if (currentVarientQuantity > 1) {
          dispatch(changeCurrentVarientQuantity(currentVarientQuantity - 1));
        }
      } else if (type === "increment") {
        dispatch(changeCurrentVarientQuantity(currentVarientQuantity + 1));
      }
    } catch (error) {
      console.error("Failed to update cart:", error);
    }
  };

  const addToCart = () => {
    quickViewProduct &&
      addToCartHandler(quickViewProduct, currentVarientQuantity);
  };

  const handleWishList = () => {
    quickViewProduct && addToWishListHandler(quickViewProduct);
  };
  const isAddedInWishList = quickViewProduct
    ? checkInWishlist(quickViewProduct)
    : false;

  return (
    <div className="fixed bottom-0 w-full hidden bg-white lg:block py-2.5 z-[10]">
      <Container>
        {isLoading ? (
          <Skeleton height={84} width={"100%"} />
        ) : (
          <div className="flex items-center justify-between py-2.5">
            <div className="flex items-center gap-5">
              <Link href="#">
                <Image
                  src={image || ""}
                  alt="Product image"
                  height={60}
                  width={60}
                />
              </Link>
              <h4>
                <Link
                  href="#"
                  className="text-black-75 font-light tracking-[-0.4px] leading-[20px] mb-2 hover:text-primary"
                >
                  {quickViewProduct?.name}
                </Link>
              </h4>
            </div>
            <div className="flex items-center gap-5">
              <span className="text-primary font-light">
                {price && formatPrice(price, currency_id)}
              </span>
              {/* <NumberInput /> */}
              <NumberInput
                value={currentVarientQuantity}
                onChange={handleCartItemChanges}
              />
              <Button
                variant="outlined"
                size="xs"
                className="group !w-[200px] h-10 justify-center items-center"
                onClick={addToCart}
              >
                <i className="las la-cart-plus text-primary text-lg group-hover:text-white mr-2"></i>
                add to cart
              </Button>
              <i
                onClick={handleWishList}
                className={`${
                  isAddedInWishList ? "las la-heart" : "lar la-heart"
                } text-lg text-primary cursor-pointer`}
              ></i>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default StickyBarBottom;
