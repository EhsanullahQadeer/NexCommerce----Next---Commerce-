'use client';

import React, { useEffect, useState } from 'react';
import Breadcrumb from '@/components/Breadcrumb';
import Container from '@/components/Container';
import AuthComponent from '@/features/auth';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useRouter } from 'next/navigation';

const Login = () => {
  const [loading, setLoading] = useState(true)
  const route = useRouter()
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
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
    if(isAuthenticated){
      route.push("/")
    } else {    
      setLoading(false)    
    }
  }, [isAuthenticated])

  if(loading){
    return <></>
  }

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
