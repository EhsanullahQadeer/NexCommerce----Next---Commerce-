'use client';

import Breadcrumb from '@/components/Breadcrumb';
import Hero from '@/components/Hero';

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
    </div>
  );
};

export default DashboardPage;
