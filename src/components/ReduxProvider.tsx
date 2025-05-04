"use client";

import { Provider } from "react-redux";
import { store } from "@/store"; // Assuming "@/store" now directly exports the store instance named 'store'
import GtagInitializer from "./GtagInitializer";

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <GtagInitializer />
      {children}
    </Provider>
  );
}