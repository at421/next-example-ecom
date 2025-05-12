'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import * as gtag from '@/utils/gtag';

const isProduction = process.env.NODE_ENV === 'production';

const GtagInitializer = () => {
  const pathname = usePathname();

  useEffect(() => {
    // Track pageview on route change in production
    if (isProduction) {
      gtag.pageview(pathname);
    }
  }, [pathname]);

  // This component doesn't render anything
  return null;
};

export default GtagInitializer;