import Breadcrumb from '@/components/Breadcrumb';
import Container from '@/components/Container';
import Hero from '@/components/Hero';
import WhistlistComponent from '@/features/whishlist';
import { getMetadata } from '@/store/api/getMetaData';

export async function generateMetadata() {
  const { data } = await getMetadata();
  if (!data) return {};

  return {
    applicationName: data.brand_name,
    title: `Wishlist | ${data.brand_name}`,
    description: data.description,
    openGraph: {
      title: `Wishlist | ${data.brand_name}`,
      description: data.description,
      url: data.site_url,
      siteName: data.brand_name,
      locale: 'en_US',
    },
  };
}

const WhishListPage = () => {
  const links = [
    {
      url: '/',
      name: 'Home',
    },
    {
      url: '#',
      name: 'Shop',
    },
    {
      url: '/whishlist',
      name: 'Whishlist',
    },
  ];

  return (
    <div>
      <Hero title="Whishlist" subTitle="Shop" />
      <Breadcrumb links={links} />
      <Container>
        <WhistlistComponent />
      </Container>
    </div>
  );
};

export default WhishListPage;
