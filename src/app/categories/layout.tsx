import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  let baseUrl = process.env.NEXT_PUBLIC_API_URL || ""
  const response = await fetch(`${baseUrl}/site-setting`);
  const { data } = await response.json();
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
