import { FC } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import Container from "@/components/Container";
import Hero from "@/components/Hero";
import ProductGrid from "@/features/categories/ProductGrid";
import { getMetadata } from "@/store/api/getMetaData";

export async function generateMetadata() {
  const data = await getMetadata();
  if (!data) return {};

  return {
    applicationName: data.brand_name,
    title: `Products | ${data.brand_name}`,
    description: data.description,
    openGraph: {
      title: `Products | ${data.brand_name}`,
      description: data.description,
      url: data.site_url,
      siteName: data.brand_name,
      locale: "en_US",
    },
  };
}

const Products: FC = () => {
  const links = [
    {
      url: "/",
      name: "Home",
    },
    {
      url: "/products",
      name: "products",
    },
  ];
  return (
    <div>
      <Hero title="Products" subTitle="Shop" subTitle2="test" />
      <Container>
        <Breadcrumb links={links} />
      </Container>
      <ProductGrid />
    </div>
  );
};

export default Products;
