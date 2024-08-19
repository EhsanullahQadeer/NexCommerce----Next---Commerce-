import Breadcrumb from '@/components/Breadcrumb';
import Container from '@/components/Container';
import Hero from '@/components/Hero';
import WhistlistComponent from '@/features/whishlist';

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
