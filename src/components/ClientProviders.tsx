'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { useWrappedStore } from '@/store';

import * as gtag from '@/utils/gtag';

const isProduction = process.env.NODE_ENV === 'production';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  const store = useWrappedStore();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (isProduction) {
      const url = pathname + searchParams.toString();
      gtag.pageview(url);
    }
  }, [pathname, searchParams]);


  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}