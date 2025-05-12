'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import * as gtag from '@/utils/gtag'; // Assuming gtag utilities are now at '@/utils/gtag'

const isProduction = process.env.NODE_ENV === 'production';

export function GtagInitializer() {
  const pathname = usePathname();

  useEffect(() => {
    if (isProduction) {
      gtag.pageview(pathname);
    }
  }, [pathname]);

  return null; // This component doesn't render anything
}