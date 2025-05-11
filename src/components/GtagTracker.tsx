"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation"; // Use from next/navigation
import * as gtag from "@/utils/gtag"; // Assuming gtag utils are in utils/gtag.ts

const GtagTracker = () => {
  const pathname = usePathname();

  useEffect(() => {
    // Track pageview when pathname changes
    gtag.pageview(pathname);
  }, [pathname]);

  return null; // This component doesn't render anything
};

export default GtagTracker;