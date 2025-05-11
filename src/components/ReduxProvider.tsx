"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { wrapper } from "@/store"; // Assuming your store wrapper is correctly aliased
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

  const { store, props } = wrapper.useWrappedStore({});
  // The original code used wrapper.withRedux(MyApp).
  // In app directory, we wrap the children with the Provider.
  // If your wrapper needs specific props or setup, this might need adjustment
  // based on the wrapper's implementation for the app directory.
  // This example assumes a simple Provider wrapper.
  // If wrapper.useWrappedStore is not the correct pattern for your specific wrapper
  // in the app dir, you might need to adjust this based on your wrapper library's docs.
  // A common pattern is just importing Provider from react-redux and using the store.
  // Example: <Provider store={store}>{children}</Provider>

  // Using the pattern suggested by some redux-wrapper examples for app dir:
  return (
    // Replace this with your actual Redux Provider setup if wrapper.useWrappedStore
    // is not the correct method for your specific wrapper library in app dir.
    // For react-redux directly: <Provider store={store}>{children}</Provider>
    // If wrapper handles the provider, just return children here after setup.
    // Assuming wrapper.useWrappedStore provides the necessary context/setup:
    <>{children}</>
  );
};

// Note: The original wrapper.withRedux was a HOC wrapping the entire app component.
// In the app directory, you typically wrap the children with a Provider component
// that holds the store. The specific implementation depends on your Redux wrapper library.
// If 'redux-wrapper' doesn't have a specific app dir pattern like `useWrappedStore`
// that provides a context/provider implicitly, you might need to use `react-redux`'s
// `Provider` directly and pass the store obtained from your wrapper's config.
// The code above uses `wrapper.useWrappedStore` as a placeholder based on some examples,
// but verify this against your wrapper library's latest app dir documentation.

// If your wrapper is just configuring the store and you need a standard Provider:
/*
import { Provider } from 'react-redux';
import { store } from '@/store'; // Assuming your store is exportable

const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (isProduction) {
      const url = pathname + searchParams.toString();
      gtag.pageview(url);
    }
  }, [pathname, searchParams]);

  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};
*/

export default ReduxProvider;