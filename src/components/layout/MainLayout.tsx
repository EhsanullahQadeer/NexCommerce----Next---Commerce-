"use client";

import { FC, ReactNode, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { cn } from "@/lib/utils";
import { selectSidebarToggle } from "@/store/slice";
import Navbar from "../Navbar";
import Footer from "../Footer";
import TopBar from "../TopBar";
import Notification from "../Notification";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  const [hideLayout, setHideLayout] = useState(false);
  const isSidebarToggle = useSelector(selectSidebarToggle);

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
