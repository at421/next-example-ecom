'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import * as gtag from '@/utils/gtag'; // Assuming gtag utils are still available

const isProduction = process.env.NODE_ENV === 'production';

export function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (isProduction) {
      // Track pageview on route change
      gtag.pageview(pathname);
    }
  }, [pathname]); // Dependency array includes pathname

  return null; // This component doesn't render anything, it's just for side effects
}