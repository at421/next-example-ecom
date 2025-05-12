'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { wrapper } from '@/store'; // Assuming store is at '@/store'
import * as gtag from '@/utils/gtag'; // Assuming gtag is at '@/utils/gtag'

const isProduction = process.env.NODE_ENV === 'production';

const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const initialLoad = useRef(true);

  useEffect(() => {
    if (isProduction) {
      // Track pageview on initial load and subsequent route changes
      if (initialLoad.current) {
        // Initial load is handled by the gtag script in layout.tsx
        initialLoad.current = false;
      } else {
        gtag.pageview(pathname);
      }
    }
  }, [pathname]);

  const { store, props } = wrapper.useWrappedStore(children);

  return (
    // You might wrap children with a Redux Provider here if `wrapper.useWrappedStore` doesn't do it internally
    // Assuming wrapper.useWrappedStore handles the Provider internally based on the pattern
    <>
      {/* Additional providers or context wrappers can go here */}
      {children}
    </>
  );
};

export default ReduxProvider;