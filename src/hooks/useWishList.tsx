import { setOpenAuthModal } from "@/store/slices/auth/authSlice";
import { isUserLoggedIn } from "@/utility/helper";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { Product } from "@/types/product";
import {
  useAddRemoveToWishlistMutation,
  useWishlistDetailsGetMutation,
} from "@/store/api/wishlistApi";
import { selectWishlist } from "@/store/slices/wishlist/wishlistSlice";
const useWishList = () => {
  const dispatch = useDispatch();
  const [wishlistDetailsGet] = useWishlistDetailsGetMutation();
  const [addRemoveToWishlist] = useAddRemoveToWishlistMutation();
  const { user } = useSelector((state: RootState) => state.auth);

  const { wishListData } = useSelector(selectWishlist);

  const checkInWishlist = (productDetails: Product): boolean => {
    return !!wishListData.find((el) => {
      return (
        el.product_id === productDetails.id &&
        el.product_variant_id === productDetails.product_variants[0]?.id
      );
    });
  };

  const handleFetchWishlist = async () => {
    try {
      if (user.id) {
        await wishlistDetailsGet({ user_id: user.id }).unwrap();
      }
    } catch (error) {
      // console.error("Failed to fetch products:", error);
    }
  };

  const addToWishListHandler = async (product: Product) => {
    const { id, product_variants } = product;

    try {
      if (!isUserLoggedIn()) {
        dispatch(setOpenAuthModal(true));
        return;
      }

      const addToWishList = {
        user_id: user.id,
        product_id: id,
        variant_id: product_variants[0]?.id,
      };

      await addRemoveToWishlist(addToWishList).unwrap();
      handleFetchWishlist();
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  return { handleFetchWishlist, addToWishListHandler ,checkInWishlist};
};

export default useWishList;
