import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';

import { StoreProvider } from '@/store/StoreProvider';
import MainLayout from '@/components/layout/MainLayout';

import '@/styles/globals.css';
import { cn } from '@/lib/utils';

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export interface SiteSettings {
  site_status: number;
  brand_name: string;
  description: string;
  site_url: string;
}

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

async function fetchSiteSettings() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";
    console.log("check prod test baseUrl", baseUrl);
    
    const response = await fetch(`${baseUrl}/site-setting`);
    console.log("check prod test response", response);
    const { data } = await response.json();
    console.log("check prod test data", data);
    return data;
  } catch (error) {
    return {}
  }
}

export async function generateMetadata(): Promise<Metadata> {
  try {
    const data = await fetchSiteSettings();

  const metadataBase = data.site_url ? new URL(data.site_url) : undefined;

  return {
    applicationName: data.brand_name,
    title: `Home | ${data.brand_name}`,
    description: data.description,
    metadataBase,
    openGraph: {
      title: `Home | ${data.brand_name}`,
      description: data.description,
      url: data.site_url,
      siteName: data.brand_name,
      locale: 'en_US',
    },
  };
  } catch (error) {
    return {}
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const { site_status, logo_url } = await fetchSiteSettings();

  return (
    <StoreProvider>
      <html lang="en">
        <head>
          <link rel="icon" href="/favicon.ico" sizes="any" />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/line-awesome/1.3.0/line-awesome/css/line-awesome.min.css"
          />
        </head>
        <body className={cn(poppins.className, 'overflow-x-hidden')}>
          {site_status === 0 ? (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
              <div className="text-center">
                <div className="mb-6">
                  <img src={logo_url} alt="Coming Soon" className="mx-auto w-1/2 md:w-1/3" />
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  We&apos;re Coming Soon
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                  Our website is currently under construction. We&apos;re working hard to get it ready. Stay tuned for updates!
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
    </StoreProvider>
  );
}
