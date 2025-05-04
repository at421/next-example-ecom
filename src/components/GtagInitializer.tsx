"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import * as gtag from "@/utils/gtag";

const isProduction = process.env.NODE_ENV === "production";

export default function GtagInitializer() {
  const pathname = usePathname();

  useEffect(() => {
    // only events on production
    if (isProduction) {
      // Track pageview when pathname changes
      gtag.pageview(pathname);
    }
  }, [pathname]); // Dependency array includes pathname

  // This component doesn't render anything, it just sets up the effect
  return null;
}