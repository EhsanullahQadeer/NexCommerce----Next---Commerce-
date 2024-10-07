import { userLoggedIn } from '@/store/slices/auth/authSlice';
import { clearCart } from '@/store/slices/cart/cartSlice';
import { clearCoupon } from '@/store/slices/coupencode/coupenCodeSlice';
import Cookies from 'js-cookie';
import { useDispatch } from "react-redux";

const useLogout = () => {
    const dispatch = useDispatch();

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("access_token");
        Cookies.remove("access_token");
        dispatch(userLoggedIn({ user: undefined, isAuthenticated: false }));
        dispatch(clearCart());
        dispatch(clearCoupon())
    }

    return { handleLogout }

}

export default useLogout
