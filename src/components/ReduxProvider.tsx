"use client";

import { wrapper } from "@/store";

const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  const WrappedComponent = wrapper.withRedux(({ children }) => <>{children}</>);
  return <WrappedComponent>{children}</WrappedComponent>;
};

export default ReduxProvider;