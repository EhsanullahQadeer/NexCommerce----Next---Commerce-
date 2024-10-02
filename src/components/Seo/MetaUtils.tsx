// utils/metaUtils.ts
import { SEOData } from '@/types/seo';
import Head from 'next/head';


interface MetaDataProps {
  seoData: SEOData;
  fallback?: {
    title?: string;
    description?: string;
    image?: string;
  };
}

export const MetaData = ({ seoData, fallback }: MetaDataProps) => {
  const {
    meta_title = fallback?.title || 'Default Title',
    meta_description = fallback?.description || 'Default Description',
    meta_keyword = '',
    meta_image,
    meta_url,
  } = seoData;

  return (
    <Head>
      <title>{meta_title}</title>
      <meta name="description" content={meta_description} />
      <meta name="keywords" content={meta_keyword} />
      {meta_image && <meta property="og:image" content={meta_image} />}
      {meta_url && <meta property="og:url" content={meta_url} />}
      <meta property="og:title" content={meta_title} />
      <meta property="og:description" content={meta_description} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta_title} />
      <meta name="twitter:description" content={meta_description} />
      {meta_image && <meta name="twitter:image" content={meta_image} />}
    </Head>
  );
};
