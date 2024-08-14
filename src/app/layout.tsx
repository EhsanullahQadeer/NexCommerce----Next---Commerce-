import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';

import { StoreProvider } from '@/store/StoreProvider';
import MainLayout from '@/components/layout/MainLayout';
import { siteConfig } from '@/data/siteConfig';

import '@/styles/globals.css';
import { cn } from '@/lib/utils';

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  applicationName: siteConfig.title,
  title: `Home | ${siteConfig.title}`,
  description: siteConfig.description,
  metadataBase: siteConfig.url,
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.title,
    locale: 'en_US',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="en">
        <head>
          <link rel="icon" href="/favicon.ico" sizes="any" />
          <link
            rel="stylesheet"
            href="https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/1.3.0/css/line-awesome.min.css"
          />
        </head>
        <body className={cn(poppins.className, 'overflow-x-hidden')}>
          <MainLayout>{children}</MainLayout>
          <div id="sidebar-wrapper"></div>
        </body>
      </html>
    </StoreProvider>
  );
}
