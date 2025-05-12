"use client";

import { wrapper } from "@/store";
import { Provider } from "react-redux";

// Note: wrapper.withRedux is designed for pages/_app.js.
// For app directory, you typically create a standard Redux provider component.
// We'll adapt it to work with app directory structure.
// Assuming wrapper.withRedux returns a component that provides the store.

// A common pattern is to create a client component that just provides the store.
// This requires your store setup (wrapper) to expose the store instance or a way to get it.
// If wrapper.withRedux is strictly tied to the old _app pattern,
// you might need to refactor your store setup slightly for the app directory.
// However, we will assume wrapper.withRedux can be used to wrap children
// in a client component context.

const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  // This is a simplified assumption. Depending on how your `wrapper` is implemented,
  // you might need a different approach, like using `wrapper.store` directly
  // with a standard react-redux Provider if exposed, or a more complex setup
  // if wrapper handles server-side rendering state hydration specifically for pages.
  // For migration, we attempt to use wrapper.withRedux if it's compatible with
  // wrapping children in a client component.
  const WrappedApp = wrapper.withRedux(({ children }) => <>{children}</>);
  return <WrappedApp>{children}</WrappedApp>;
};

export default ReduxProvider;