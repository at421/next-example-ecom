'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import * as gtag from "@/utils/gtag";

const isProduction = process.env.NODE_ENV === 'production';

const GtagInitializer = () => {
  const pathname = usePathname();

  useEffect(() => {
    if (isProduction && gtag.GA_TRACKING_ID) {
      // Track pageview when route is changed
      gtag.pageview(pathname);
    }
  }, [pathname]);

  return null; // This component doesn't render anything
};

export default GtagInitializer;