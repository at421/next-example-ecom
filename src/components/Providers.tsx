'use client';

import { wrapper } from '@/store';
import * as gtag from '@/utils/gtag';
import Router from 'next/router';
import { useEffect } from 'react';

const isProduction = process.env.NODE_ENV === 'production';

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (isProduction) {
      const handleRouteChangeComplete = (url: string) => {
        gtag.pageview(url);
      };
      Router.events.on('routeChangeComplete', handleRouteChangeComplete);
      return () => {
        Router.events.off('routeChangeComplete', handleRouteChangeComplete);
      };
    }
  }, [isProduction]);

  const WrappedComponent = wrapper.withRedux(({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ));


  return <WrappedComponent>{children}</WrappedComponent>;
}