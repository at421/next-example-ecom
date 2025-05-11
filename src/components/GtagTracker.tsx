'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
// Assuming your gtag utils are exported from '@/utils/gtag'
import * as gtag from '@/utils/gtag'; // Example: if '@/utils/gtag.ts' exports pageview function

const isProduction = process.env.NODE_ENV === 'production';
const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID; // Assuming GA_TRACKING_ID is a public env var now

export default function GtagTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (isProduction && GA_TRACKING_ID) {
      const url = pathname + searchParams.toString();
      gtag.pageview(url);
    }
  }, [pathname, searchParams, isProduction]);

  return null; // This component is only for side effects
}