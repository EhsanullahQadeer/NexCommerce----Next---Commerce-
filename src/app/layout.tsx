"use client";
import { Poppins } from "next/font/google";
import { StoreProvider } from "@/store/StoreProvider";
import MainLayout from "@/components/layout/MainLayout";

import "@/styles/globals.css";
import { cn } from "@/lib/utils";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { I18Provider } from "./i18";
import { useEffect, useState } from "react";
export interface SiteSettings {
  site_status: number;
  brand_name: string;
  description: string;
  site_url: string;
}

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [locale, setLocale] = useState("EN");
  const [site_status, setSiteStatus] = useState();
  const [logo_url, setLogoUrl] = useState();

  async function fetchSiteSettings() {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";
      const response = await fetch(`${baseUrl}site-setting`);
      const { data } = await response.json();
      return data;
    } catch (error) {
      return {};
    }
  }
  const initializeCalls = async () => {
    const data = await fetchSiteSettings();
    data.map((item: any) => {
      if (item.key.includes("site_status")) {
        setSiteStatus(item.value);
      }
      if (item.key.includes("logo_url")) {
        setLogoUrl(item.value);
      }
    });
    setLocale(window.sessionStorage.getItem("lang") || "EN");
  };

  useEffect(() => {
    initializeCalls();
  }, []);

  return (
    <StoreProvider>
      <I18Provider>
        <html lang={locale}>
          <head>
            <link rel="icon" href="/favicon.ico" sizes="any" />
            <link
              rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/line-awesome/1.3.0/line-awesome/css/line-awesome.min.css"
            />
          </head>
          <body className={cn(poppins.className, "overflow-x-hidden")}>
            {site_status == 0 ? (
              <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="text-center">
                  <div className="mb-6">
                    <img
                      src={logo_url}
                      alt="Coming Soon"
                      className="mx-auto w-1/2 md:w-1/3"
                    />
                  </div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    We&apos;re Coming Soon
                  </h1>
                  <p className="text-lg text-gray-600 mb-8">
                    Our website is currently under construction. We&apos;re
                    working hard to get it ready. Stay tuned for updates!
                  </p>
                </div>
              </div>
            ) : (
              <MainLayout>
                {children}
                <ToastContainer
                  position="top-right"
                  autoClose={3000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="light"
                  limit={1}
                />
              </MainLayout>
            )}
            <div id="sidebar-wrapper"></div>
          </body>
        </html>
      </I18Provider>
    </StoreProvider>
  );
}
