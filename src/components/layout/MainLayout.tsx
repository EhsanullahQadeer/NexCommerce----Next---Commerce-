'use client';

import { FC, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../Navbar';
import { cn } from '@/lib/utils';
import { selectSidebarToggle } from '@/store/slice';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  const isSidebarToggle = useSelector(selectSidebarToggle);
  return (
    <div
      className={cn(isSidebarToggle && 'translate-x-[200px] lg:translate-x-0')}
      style={{ transition: 'all 0.4s ease' }}
    >
      <Navbar />
      <main className={cn('bg-white min-h-screen')}>{children}</main>
    </div>
  );
};

export default MainLayout;
