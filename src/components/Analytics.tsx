"use client";

import { useEffect, Fragment } from "react";
import { usePathname } from "next/navigation";
import * as gtag from "@/utils/gtag";

const isProduction = process.env.NODE_ENV === "production";

const Analytics = () => {
  const pathname = usePathname();

  useEffect(() => {
    if (isProduction) {
      // Track page views on route changes
      gtag.pageview(pathname);
    }
  }, [pathname]); // Depend on pathname to re-run effect on navigation

  // Note: The Google Analytics script tags should typically be placed
  // in the root layout.tsx file using next/script for app router.
  // This component now primarily handles client-side route change tracking.

  return <Fragment />; // This component doesn't render visible UI
};

export default Analytics;