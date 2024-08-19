'use client';

import Breadcrumb from '@/components/Breadcrumb';
import Container from '@/components/Container';
import Hero from '@/components/Hero';
import CheckoutComponent from '@/features/checkout';

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
      <Container>
        <CheckoutComponent />
      </Container>
    </div>
  );
};

export default Checkout;
