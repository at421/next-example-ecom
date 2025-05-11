"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import * as gtag from "@/utils/gtag"; // Assuming gtag utility is in src/utils or root utils

const isProduction = process.env.NODE_ENV === "production";

export default function GAPageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (isProduction) {
      gtag.pageview(pathname);
    }
  }, [pathname]);

  return null;
}