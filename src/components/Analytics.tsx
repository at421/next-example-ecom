'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import * as gtag from '@/utils/gtag';

const isProduction = process.env.NODE_ENV === 'production';

export function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (isProduction) {
      // Track pageview on route change
      gtag.pageview(pathname);
    }
  }, [pathname]);

  return null;
}