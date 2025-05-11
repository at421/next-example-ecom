'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import * as gtag from '@/utils/gtag';

const isProduction = process.env.NODE_ENV === 'production';

export function GtagRouterEvents() {
  const pathname = usePathname();

  useEffect(() => {
    // Only track events on production
    if (isProduction) {
      // Notice how we track pageview when route is changed
      // usePathname gives the current path
      gtag.pageview(pathname);
    }
  }, [pathname]); // Track pageview whenever the pathname changes

  // This component doesn't render anything
  return null;
}