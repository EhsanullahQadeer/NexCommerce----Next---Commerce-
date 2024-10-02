import Cookies from 'js-cookie';
import store from '@/store';
import { userLoggedIn } from '@/store/slices/auth/authSlice';
import { clearCart } from '@/store/slices/cart/cartSlice';
import { clearCoupon } from '@/store/slices/coupencode/coupenCodeSlice';
export const handleLogout = () => {
    const { dispatch } = store
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
    Cookies.remove("access_token");
    store
    dispatch(userLoggedIn({ user: undefined, isAuthenticated: false }));
    dispatch(clearCart());
    dispatch(clearCoupon())
    window.location.href = "/auth?notify=true";

};