"use client";

import { useEffect } from "react";
import Router from "next/router";
import * as gtag from "@/utils/gtag"; // Adjust path as needed

const isProduction = process.env.NODE_ENV === "production";

export default function GtagInitializer() {
  useEffect(() => {
    // only events on production
    if (isProduction) {
      // Notice how we track pageview when route is changed
      const handleRouteChange = (url: string) => {
        gtag.pageview(url);
      };
      Router.events.on("routeChangeComplete", handleRouteChange);

      return () => {
        Router.events.off("routeChangeComplete", handleRouteChange);
      };
    }
  }, []); // Empty dependency array means this effect runs once on mount

  // This component doesn't render anything, it just sets up the effect
  return null;
}