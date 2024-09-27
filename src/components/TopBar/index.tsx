import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import Container from "../Container";
import Dropdown from "../Dropdown";
import { LinkType, topBarLinks } from "./data";
import DropdownMenu from "../DropdownMenu";
import Modal from "../Modal";
import AuthComponent from "@/features/auth";
import { useDispatch, useSelector } from "react-redux";
import { userLoggedIn } from "@/store/slices/auth/authSlice";
import { RootState } from "@/store";
import { clearCart } from "@/store/slices/cart/cartSlice";
import { selectCurrency } from "@/store/slices/currenctlist/currencySlice";
import Cookies from 'js-cookie';
import {
  selectSiteSetting,
  SiteSetting,
  updateSiteName,
} from "@/store/slices/siteSetting/siteSettingSlice";
import { selectLanguage } from "@/store/slices/languagelist/languageSlice";
import { useTranslations } from "next-intl";

const TopBar: React.FC = () => {
  const t = useTranslations();
  const { user } = useSelector((state: RootState) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownMobileOpen, setDropdownMobileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null); // Reference for the dropdown container
  const dropdownMobileRef = useRef<HTMLDivElement | null>(null); // Reference for the dropdown container
  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();

  const { currencyData } = useSelector(selectCurrency);
  const { languageData } = useSelector(selectLanguage);
  const { selected_currencies_id } = useSelector(selectSiteSetting);
  const { selected_language_id } = useSelector(selectSiteSetting);

  const filteredLinks: LinkType[] = topBarLinks.filter(
    (link) => link.url !== pathname
  );

  const handleToggleLoginModal = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsOpen(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
    Cookies.remove("access_token");
    dispatch(userLoggedIn({ user: undefined, isAuthenticated: false }));
    dispatch(clearCart());
    setDropdownOpen(false);
    setDropdownMobileOpen(false);
    return router.push("/");
  };

  useEffect(() => {
    const userData = localStorage.getItem("user");
    dispatch(
      userLoggedIn({
        user: JSON.parse(userData || "{}"),
        isAuthenticated: userData ? true : false,
      })
    );
  }, [dispatch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownMobileRef.current &&
        !dropdownMobileRef.current.contains(event.target as Node)
      ) {
        setDropdownMobileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const currencyOptions = currencyData.map((el) => ({
    id: el.id.toString(),
    name: el.currency_code,
    value: el.id.toString(),
  }));
  const languageOptions = languageData.map((el) => ({
    id: el.id.toString(),
    name: el?.language_code?.toUpperCase(),
    value: el?.id?.toString(),
  }));

  return (
    <div className="relative bg-white text-black-500 text-xs z-[91]">
      <Container>
        <div className="mx-auto flex justify-between items-center border-b border-[#f4f4f4] py-1">
          <div className="flex items-center space-x-6">
            <Dropdown
              id="currency"
              items={currencyOptions}
              selected={currencyOptions.find(
                (el) => el.id == selected_currencies_id.toString()
              )}
              style="px-0"
            />
            <Dropdown
              id="langauges"
              items={languageOptions}
              selected={languageOptions.find(
                (el) => el.id == selected_language_id.toString()
              )}
              onSelect={(e: any, item) => {
                window.sessionStorage.setItem("lang", item.name);
                dispatch(updateSiteName({ selected_language_id: e } as SiteSetting));
              }}
              style="px-0"
            />
          </div>

          <div className="hidden sm:flex items-center space-x-6">
            {filteredLinks.map((item, index) => {
              if (item.name === "login") {
                return user?.name ? (
                  <div className="relative" key={index} ref={dropdownRef}>
                    <button
                      onClick={() => setDropdownOpen((prev) => !prev)}
                      className="flex items-center text-[13px] tracking-[-0.13px] font-extralight uppercase hover:text-primary"
                    >
                      {item?.icon && (
                        <i className={cn(item.icon, "text-[15px] mr-2")}></i>
                      )}
                      {user.name}
                    </button>
                    {dropdownOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white shadow-md border rounded-lg">
                        <Link
                          href="/dashboard"
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                        >
                          {t("Dashboard")}
                        </Link>
                        <Link
                          href="/settings"
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                        >
                          Settings
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={index}
                    href={"#"}
                    className="flex items-center text-[13px] tracking-[-0.13px] font-extralight uppercase hover:text-primary"
                    onClick={handleToggleLoginModal}
                  >
                    {item?.icon && (
                      <i className={cn(item.icon, "text-[15px] mr-2")}></i>
                    )}{" "}
                    {item.name}
                  </Link>
                );
              }
              return (
                <Link
                  key={index}
                  href={item.name === "login" ? "#" : item.url}
                  className="flex items-center text-[13px] tracking-[-0.13px] font-extralight uppercase hover:text-primary"
                  onClick={
                    item.name === "login" && !user?.name
                      ? handleToggleLoginModal
                      : undefined
                  }
                >
                  {item?.icon && (
                    <i className={cn(item.icon, "text-[15px] mr-2")}></i>
                  )}
                  {item.name}
                </Link>
              );
            })}
          </div>
          <div className="flex items-center sm:hidden">
            <DropdownMenu
              items={topBarLinks}
              label="Links"
              position="bottom-right"
            />
            {user?.name ? (
              <div className="relative" ref={dropdownMobileRef}>
                <button
                  onClick={() => setDropdownMobileOpen((prev) => !prev)}
                  className="flex items-center text-[13px] tracking-[-0.13px] font-extralight uppercase hover:text-primary"
                >
                  <i className={cn("lar la-user", "text-[15px] mr-2")}></i>
                  {user?.name}
                </button>
                {dropdownMobileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-md border rounded-lg">
                    <Link
                      href="/dashboard"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      {t("Dashboard")}
                    </Link>
                    <Link
                      href="/settings"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </Container>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        className="!max-w-[575px]"
      >
        <AuthComponent setIsOpen={setIsOpen} />
      </Modal>
    </div>
  );
};

export default TopBar;
