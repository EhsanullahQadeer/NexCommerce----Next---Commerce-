'use client';

import React from 'react';
import Breadcrumb from '@/components/Breadcrumb';
import Container from '@/components/Container';
import AuthComponent from '@/features/auth';

const Login = () => {
  const links = [
    {
      url: '/',
      name: 'Home',
    },
    {
      url: '#',
      name: 'Login',
    },
  ];

  return (
    <div className="border-t">
      <Container>
        <Breadcrumb links={links} />
      </Container>
      <div className="flex items-center justify-center bg-[url('/login-bg.jpg')] bg-cover bg-center py-[120px]">
        <Container>
          <AuthComponent />
        </Container>
      </div>
    </div>
  );
};

export default Login;
