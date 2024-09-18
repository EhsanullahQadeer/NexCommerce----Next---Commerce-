import type { Metadata } from 'next';
import { getMetadata } from "@/store/api/getMetaData";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getMetadata();
  if (!data) return {};
  const metadataBase = data.site_url ? new URL(data.site_url) : undefined;
  return {
    applicationName: data.brand_name,
    title: `Product categories | ${data.brand_name}`,
    description: data.description,
    metadataBase,
  };
}

export default function CategoriesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
