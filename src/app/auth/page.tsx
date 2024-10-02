"use client";
import React, { useEffect, useState } from 'react';
import Breadcrumb from '@/components/Breadcrumb';
import Container from '@/components/Container';
import AuthComponent from '@/features/auth';
import {useSearchParams } from 'next/navigation';
import { showToast } from '@/utility/showToast';
import { useRouter } from 'next/navigation';
const Login = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
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

  useEffect(() => {
    const notify = searchParams.get('notify');
    if (notify === 'true') {
       // Remove 'notify' from the URL after processing
       const currentUrl = new URL(window.location.href);
       currentUrl.searchParams.delete('notify');
       router.replace(currentUrl.toString())
      showToast('You are not authorized. Please log in.', "401_error");
    }
  }, [searchParams]);
  
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
