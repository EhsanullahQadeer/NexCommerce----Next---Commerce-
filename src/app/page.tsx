import { FC } from "react";
import ProductCategories from "@/features/product";
import Slider from "@/components/Slider";
import { getMetadata } from "@/store/api/getMetaData";
import useHome from "@/hooks/home/useHome";

export async function generateMetadata() {
  const data = await getMetadata();
  if (!data) return {};

  return {
    applicationName: data.brand_name,
    title: `Home | ${data.brand_name}`,
    description: data.description,
    openGraph: {
      title: `Home | ${data.brand_name}`,
      description: data.description,
      url: data.site_url,
      siteName: data.brand_name,
      locale: "en_US",
    },
  };
}

const Home: FC = () => {
  return (
    <>
      <Slider />
      <ProductCategories />
    </>
  );
};

export default Home;
