"use client";

import { Provider } from "react-redux";
import { wrapper } from "@/store"; // Assuming store is in src/store or root store

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { store } = wrapper.useWrappedStore({});
  return <Provider store={store}>{children}</Provider>;
}