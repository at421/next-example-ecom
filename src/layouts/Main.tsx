'use client';

import { usePathname } from 'next/navigation';
import React from 'react';

type LayoutWrapperProps = {
  children: React.ReactNode;
};

const LayoutWrapper = ({ children }: LayoutWrapperProps) => {
  const pathname = usePathname();

  return (
    <main className={pathname !== '/' ? 'main-page' : ''}>
      {children}
    </main>
  );
};

export default LayoutWrapper;