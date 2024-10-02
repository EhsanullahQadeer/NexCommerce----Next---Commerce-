import {
  useAddToCartMutation,
  useCartDetailsGetMutation,
} from "@/store/api/cartApi";
import { setOpenAuthModal } from "@/store/slices/auth/authSlice";
import { isUserLoggedIn } from "@/utility/helper";
import { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { Product, ProductVariant } from "@/types/product";
const useCart = () => {
  const [addToCart] = useAddToCartMutation();
  const [cartDetailsGet] = useCartDetailsGetMutation();
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

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

  return { handleFetchCart, addToCartHandler };
};

export default useCart;
