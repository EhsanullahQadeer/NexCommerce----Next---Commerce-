"use client";

import { FC, ReactNode, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cn } from "@/lib/utils";
import { selectSidebarToggle } from "@/store/slice";
import {
  useFetchCategoriesListMutation,
  useFetchFilteredProductsMutation,
} from "@/store/api/productApi";
import { selectProducts } from "@/store/slices/products/productsSlice";
import Navbar from "../Navbar";
import Footer from "../Footer";
import TopBar from "../TopBar";
import Notification from "../Notification";
import { RootState } from "@/store";
import { useCartDetailsGetMutation } from "@/store/api/cartApi";
import { useFetchSiteSettingsMutation } from "@/store/api/siteSettingApi";
import { useWishlistDetailsGetMutation } from "@/store/api/wishlistApi";
import { useFetchCurrencyListMutation } from "@/store/api/currencyListApi";
import { useFetchLanguageListMutation } from "@/store/api/languageListApi";
import { useAddVisitorMutation } from "@/store/api/visitorApi";
import { selectCart, setCartTotalAmount } from "@/store/slices/cart/cartSlice";
import { selectCurrency } from "@/store/slices/currenctlist/currencySlice";
import {
  selectSiteSetting,
  updateSiteShippingData,
} from "@/store/slices/siteSetting/siteSettingSlice";
import useCurrency from "@/hooks/useCurrency";
import { useFetchCoupenCodeMutation } from "@/store/api/coupenCodeApi";
import {
  clearCoupon,
  selectCoupenCode,
  updateCoupenCode,
} from "@/store/slices/coupencode/coupenCodeSlice";
import AuthComponent from "@/features/auth";
import Modal from "../Modal";
import { setOpenAuthModal } from "@/store/slices/auth/authSlice";
function detectBrowser() {
  var userAgent = navigator.userAgent;
  if (userAgent.indexOf("Edg") > -1) {
    return "Microsoft Edge";
  } else if (userAgent.indexOf("Chrome") > -1) {
    return "Chrome";
  } else if (userAgent.indexOf("Firefox") > -1) {
    return "Firefox";
  } else if (userAgent.indexOf("Safari") > -1) {
    return "Safari";
  } else if (userAgent.indexOf("Opera") > -1) {
    return "Opera";
  } else if (
    userAgent.indexOf("Trident") > -1 ||
    userAgent.indexOf("MSIE") > -1
  ) {
    return "Internet Explorer";
  }

  return "Unknown";
}
interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  const { user, isAuthenticated, openAuthModal } = useSelector(
    (state: RootState) => state.auth
  );
  const [hideLayout, setHideLayout] = useState(false);
  const isSidebarToggle = useSelector(selectSidebarToggle);
  const {
    categoriesFilter,
    sortByFilter,
    colorFilter,
    priceRangeFilter,
    limitFilter,
    skip,
  } = useSelector(selectProducts);

  const [fetchFilteredProducts] = useFetchFilteredProductsMutation();
  const [fetchSiteSettings] = useFetchSiteSettingsMutation();
  const [fetchCategoriesList] = useFetchCategoriesListMutation();
  const [cartDetailsGet] = useCartDetailsGetMutation();
  const [wishlistDetailsGet] = useWishlistDetailsGetMutation();
  const [currencyListGet] = useFetchCurrencyListMutation();
  const [languageListGet] = useFetchLanguageListMutation();
  const [addVisitor] = useAddVisitorMutation();
  const [fetchCoupenCode] = useFetchCoupenCodeMutation();
  const { cartDetails } = useSelector(selectCart);
  const { currencyData } = useSelector(selectCurrency);
  const { coupon_code } = useSelector(selectCoupenCode);
  const {
    selected_currencies_id,
    initial_selected_currencies_id,
    initial_free_shipping_threshold,
    initial_shipping_amount,
  } = useSelector(selectSiteSetting);

  const { calculatePrice } = useCurrency();
  const dispatch = useDispatch();
  const handleFetchCategories = async () => {
    try {
      await fetchCategoriesList({}).unwrap();
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const handleFetchCurrencyList = async () => {
    try {
      await currencyListGet({}).unwrap();
    } catch (error) {
      console.error("Failed to Currency List:", error);
    }
  };

  const handleFetchLanguageList = async () => {
    try {
      await languageListGet({}).unwrap();
    } catch (error) {
      console.error("Failed to Language List:", error);
    }
  };
  const handleFetchCart = async () => {
    try {
      if (user?.id) {
        await cartDetailsGet({ user_id: user?.id }).unwrap();
      }
    } catch (error) {
      // console.error("Failed to fetch products:", error);
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

  const handleFetchSiteSetting = async () => {
    try {
      await fetchSiteSettings({}).unwrap();
    } catch (error) {}
  };

  function getLocation() {
    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((res) => {
          let browser = detectBrowser();
          if (browser && res.coords.latitude && res.coords.longitude) {
            console.log(
              "browser-->",
              browser,
              res.coords.latitude,
              res.coords.longitude
            );
            handleFetchVisitor(
              browser,
              res.coords.latitude,
              res.coords.longitude
            );
          }
        });
      } else {
        console.log("Geolocation is not supported by this device");
      }
    } catch (error) {}
  }

  const getCouponDetails = async () => {
    if (!coupon_code) return;
    const response = await fetchCoupenCode(coupon_code).unwrap();
    const couponData = response.data;
    if (couponData) {
      dispatch(
        updateCoupenCode({
          couponData,
        })
      );
    } else {
      dispatch(clearCoupon());
    }
  };

  const handleFetchVisitor = async (
    browser: string,
    latitude: number,
    longitude: number
  ) => {
    try {
      await addVisitor({ browser, latitude, longitude }).unwrap();
    } catch (error) {}
  };

  useEffect(() => {
    handleFetchCategories();
    setTimeout(() => {
      handleFetchSiteSetting();
    }, 0);

    let browerInfo = sessionStorage.getItem("browserinfo");
    if (!browerInfo) {
      getLocation();
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      handleFetchCart();
      handleFetchWishlist();
      handleFetchCurrencyList();
      handleFetchLanguageList();
      getCouponDetails();
    }, 0);
  }, [user, isAuthenticated]);

  useEffect(() => {
    if (window && window.location.pathname === "/coming-soon") {
      setHideLayout(true);
    }
  }, []);

  useEffect(() => {
    const totalAmount = cartDetails.reduce(
      (
        total,
        { price_at_purchase, quantity, product: { currency_id, price } }
      ) => total + calculatePrice(quantity * price, currency_id),
      0
    );
    dispatch(setCartTotalAmount(totalAmount));
  }, [cartDetails, selected_currencies_id, currencyData, dispatch]);

  useEffect(() => {
    const freeShippingThreshold = calculatePrice(
      Number(initial_free_shipping_threshold),
      initial_selected_currencies_id
    );
    const shippingAmount = calculatePrice(
      Number(initial_shipping_amount),
      initial_selected_currencies_id
    );
    dispatch(
      updateSiteShippingData({
        free_shipping_threshold: freeShippingThreshold.toString(),
        shipping_amount: shippingAmount.toString(),
      })
    );
  }, [
    selected_currencies_id,
    initial_free_shipping_threshold,
    initial_shipping_amount,
    initial_selected_currencies_id,
  ]);

  return (
    <div
      className={cn(
        "flex bg-white min-h-screen flex-col",
        isSidebarToggle && "translate-x-[200px] lg:translate-x-0"
      )}
      style={{ transition: "all 0.4s ease" }}
    >
      {!hideLayout && (
        <>
          <Notification />
          <TopBar />
          <Navbar />
        </>
      )}
      <main>{children}</main>
      {!hideLayout && <Footer />}
      <Modal
        isOpen={openAuthModal}
        onClose={() => dispatch(setOpenAuthModal(false))}
        className="!max-w-[575px]"
      >
        <AuthComponent
          setIsOpen={(value) => {
            dispatch(setOpenAuthModal(value));
          }}
        />
      </Modal>
    </div>
  );
};

export default MainLayout;
