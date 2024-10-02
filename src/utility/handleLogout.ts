import Cookies from 'js-cookie';
import store from '@/store';
import { userLoggedIn } from '@/store/slices/auth/authSlice';
import { clearCart } from '@/store/slices/cart/cartSlice';
import { clearCoupon } from '@/store/slices/coupencode/coupenCodeSlice';
export const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
    Cookies.remove("access_token");
    window.location.href = "/auth?notify=true";

};