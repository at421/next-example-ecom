'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { Provider } from 'react-redux'; // Assuming react-redux is used
import { store } from '@/store'; // Assuming store is exported directly
import * as gtag from '@/utils/gtag';

const isProduction = process.env.NODE_ENV === 'production';

const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const initialLoad = useRef(true);

  useEffect(() => {
    if (isProduction) {
      // Track pageview on initial load and subsequent route changes
      if (initialLoad.current) {
        // Initial load is typically handled by the gtag script in layout.tsx
        initialLoad.current = false;
      } else {
        gtag.pageview(pathname);
      }
    }
  }, [pathname]);

  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};

export default ReduxProvider;