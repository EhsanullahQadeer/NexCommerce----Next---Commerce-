import type { Metadata } from 'next';
import { siteConfig } from '@/data/siteConfig';

export const metadata: Metadata = {
  applicationName: siteConfig.title,
  title: `Product categories | ${siteConfig.title}`,
  description: siteConfig.description,
  metadataBase: siteConfig.url,
};

export default function CategoriesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
