import {
  useAddToCartMutation,
  useCartDetailsGetMutation,
} from "@/store/api/cartApi";
import { setOpenAuthModal } from "@/store/slices/auth/authSlice";
import { isUserLoggedIn } from "@/utility/helper";
import { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { Product, ProductVariant } from "@/types/product";
import { toast } from "react-toastify";
import { useFetchCoupenCodeMutation } from "@/store/api/coupenCodeApi";
import { RESPONSE_MESSAGES } from "@/utility/constant";
import { selectCart } from "@/store/slices/cart/cartSlice";
import Cookies from "js-cookie";
import { updateCoupenCode } from "@/store/slices/coupencode/coupenCodeSlice";
import useCurrency from "./useCurrency";
const useCart = () => {
  const [addToCart] = useAddToCartMutation();
  const [cartDetailsGet] = useCartDetailsGetMutation();
  const { user } = useSelector((state: RootState) => state.auth);
  const { totalAmount } = useSelector(selectCart);
  const dispatch = useDispatch();
  const [fetchCoupenCode] = useFetchCoupenCodeMutation();
  const { formatPrice, calculatePrice } = useCurrency();
  const handleApplyCoupon = async (
    couponCode: string
  ): Promise<{ clear: boolean } | void> => {
    try {
      if (!couponCode) {
        toast.warning("Please enter a coupon code.");
        return;
      }

      const response = await fetchCoupenCode(couponCode).unwrap();
      const couponData = response.data;
      if (couponData) {
        if (
          totalAmount >=
          calculatePrice(
            couponData.minimum_order_amount,
            couponData.currency_id
          )
        ) {
          toast.success(RESPONSE_MESSAGES.GENERAL.COUPON_APPLIED);
          Cookies.set("coupon_code", couponCode);
          dispatch(
            updateCoupenCode({
              coupon_code: couponCode,
              couponData: response.data,
            })
          );
        } else {
          toast.warning(
            RESPONSE_MESSAGES.GENERAL.MINIMUM_AMOUNT_USE_COUPON.replace(
              "?",
              formatPrice(
                couponData.minimum_order_amount,
                couponData.currency_id
              )
            )
          );
        }
      } else {
        toast.warning(RESPONSE_MESSAGES.GENERAL.COUPON_NOT_FOUND);
        return { clear: true };
      }
    } catch (error) {
      toast.error(RESPONSE_MESSAGES.GENERAL.COUPON_ERROR);
      return { clear: true };
    }
  };

  const handleFetchCart = async (): Promise<void> => {
    try {
      if (user?.id) {
        await cartDetailsGet({ user_id: user.id }).unwrap();
      }
    } catch (error) {
      console.error("Failed to fetch cart details:", error);
    }
  };

  const addToCartHandler = async (
    product: Product,
    currentVarientQuantity: number
  ): Promise<void> => {
    const { product_variants, id } = product;

    try {
      if (!isUserLoggedIn()) {
        dispatch(setOpenAuthModal(true));
        return;
      }

      const variant: ProductVariant = product_variants[0];

      const addToCartDetails = {
        user_id: user.id,
        products: [
          {
            product_id: id,
            variant_id: variant.id,
            price: variant.price,
            quantity: currentVarientQuantity,
          },
        ],
      };

      await addToCart(addToCartDetails).unwrap();
      handleFetchCart();
    } catch (error) {
      console.error("Failed to add product to cart:", error);
    }
  };

  return { handleFetchCart, addToCartHandler, handleApplyCoupon };
};

export default useCart;
