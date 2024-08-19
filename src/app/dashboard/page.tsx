'use client';

import Breadcrumb from '@/components/Breadcrumb';
import Container from '@/components/Container';
import Hero from '@/components/Hero';
import DashboardComponent from '@/features/dashboard';

const DashboardPage = () => {
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
      url: '/dashboard',
      name: 'Dashboard',
    },
  ];

  return (
    <div>
      <Hero title="My Account" subTitle="Shop" />
      <Breadcrumb links={links} />
      <Container>
        <DashboardComponent />
      </Container>
    </div>
  );
};

export default DashboardPage;
