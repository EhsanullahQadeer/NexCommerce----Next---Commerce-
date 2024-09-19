"use client";

import { FC, ReactNode, useEffect, useState } from "react";
import { useSelector } from "react-redux";
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
import { debug } from "console";
import ProductDetailPage from "@/app/products/[slug]/page";

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
  const { user, isAuthenticated } = useSelector(
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

  const handleFetchProductsWithFilter = async () => {
    try {
      const filter = {
        filters: {
          categories: categoriesFilter,
          sort: sortByFilter,
          color: colorFilter,
          priceRange: `1-${priceRangeFilter}`,
        },
        pagination: {
          skip: skip,
          limit: limitFilter,
        },
      };
      await fetchFilteredProducts(filter).unwrap();
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

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
    }, 0);
  }, [user, isAuthenticated]);

  useEffect(() => {
    handleFetchProductsWithFilter();
  }, [categoriesFilter, sortByFilter, colorFilter, priceRangeFilter]);

  useEffect(() => {
    if (window && window.location.pathname === "/coming-soon") {
      setHideLayout(true);
    }
  }, []);

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
    </div>
  );
};

export default MainLayout;
