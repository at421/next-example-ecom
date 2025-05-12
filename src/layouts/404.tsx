'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/header';

type LayoutType = {
  children?: React.ReactNode;
};

const ErrorPage = ({ children }: LayoutType) => {
  const pathname = usePathname();

  return (
    <div className="app-main">
      <Header isErrorPage />

      <main className={pathname !== '/' ? 'main-page' : ''}>{children}</main>
    </div>
  );
};

export default ErrorPage;