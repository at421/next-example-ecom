"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Provider } from "react-redux";
import { store } from "@/store"; // Assuming your store instance is exported from here
import * as gtag from "@/utils/gtag"; // Assuming your gtag util is correctly aliased

const isProduction = process.env.NODE_ENV === "production";

const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Track pageviews on route changes in production
  useEffect(() => {
    if (isProduction) {
      const url = pathname + searchParams.toString();
      gtag.pageview(url);
    }
  }, [pathname, searchParams]); // Depend on pathname and searchParams

  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};

export default ReduxProvider;