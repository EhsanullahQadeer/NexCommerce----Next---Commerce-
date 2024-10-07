"use client";
import React, { useMemo } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import Container from "@/components/Container";
import Hero from "@/components/Hero";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import useLogout from "@/hooks/useLogout";

const links = [
  {
    url: "/",
    name: "Home",
  },
  {
    url: "#",
    name: "Shop",
  },
  {
    url: "/dashboard",
    name: "Dashboard",
  },
];

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const pathname = usePathname();
  const router = useRouter();
  const { handleLogout } = useLogout();

  const isActiveLink = (path: string) => {
    const pathnameWithoutQuery = pathname.split("?")[0];
    return pathnameWithoutQuery === path;
  };

  const handleLogoutClick = (e: React.MouseEvent) => {
    e.preventDefault();
    handleLogout();
    router.push("/auth");
  };

  const tabs = useMemo(
    () => [
      {
        id: 1,
        label: "Dashboard",
        url: "/dashboard",
      },
      { id: 2, label: "Orders", url: "/dashboard/orders" },
      { id: 3, label: "Notifications", url: "/dashboard/notifications" },
      { id: 4, label: "Addresses", url: "/dashboard/addresses" },
      { id: 5, label: "Account Details", url: "/dashboard/account-details" },
      { id: 8, label: "Support Tickets", url: "/dashboard/support-tickets" },
      { id: 7, label: "Signout", url: "/auth", onclick: handleLogoutClick },
    ],
    []
  );

  return (
    <div>
      <Hero title="My Account" subTitle="Shop" />
      <Breadcrumb links={links} />
      <Container>
        <div className="flex flex-col md:flex-row w-full gap-5 mt-[30px] mb-[50px]">
          <ul className="flex flex-col w-full max-w-full md:max-w-[250px] lg:max-w-[335px] border-gray-300 mb-[30px]">
            {tabs.map((tab, index) => {
              const { url } = tab;
              const isActive = isActiveLink(url);

              return (
                <li
                  key={tab.id}
                  className={cn(
                    "relative text-sm font-extralight leading-[21px] py-[14px] hover:text-primary cursor-pointer border-b border-black-300",
                    isActive && "pl-5 text-primary"
                  )}
                >
                  <Link
                    {...(tab?.onclick && { onClick: tab.onclick })}
                    href={url}
                  >
                    <span>
                      <i
                        className={cn(
                          "las la-long-arrow-alt-right flex absolute text-[15px] items-center h-[15px] left-[-20px] top-0 bottom-0 my-auto opacity-0 invisible transition-all duration-[0.35s]",
                          isActive && "left-0 opacity-1 visible"
                        )}
                      ></i>
                      {tab.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="flex-1 bg-white">{children}</div>
        </div>
      </Container>
    </div>
  );
};

export default Layout;
