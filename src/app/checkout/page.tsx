import Breadcrumb from '@/components/Breadcrumb';
import Hero from '@/components/Hero';

const Checkout = () => {
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
      url: '/checkout',
      name: 'Checkout',
    },
  ];

  return (
    <div>
      <Hero title="Checkout" subTitle="Shop" />
      <Breadcrumb links={links} />
    </div>
  );
};

export default Checkout;
