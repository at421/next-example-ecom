'use client';

import { wrapper } from '@/store';
import * as gtag from '@/utils/gtag';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const isProduction = process.env.NODE_ENV === 'production';

export default function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    if (isProduction && pathname) {
      gtag.pageview(pathname);
    }
  }, [pathname, isProduction]);

  const WrappedComponent = wrapper.withRedux(({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ));


  return <WrappedComponent>{children}</WrappedComponent>;
}