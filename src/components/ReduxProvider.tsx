"use client";

import { Provider } from "react-redux";
import { wrapper } from "@/store"; // Adjust path as needed
import GtagInitializer from "./GtagInitializer"; // Assuming GtagInitializer is in the same components folder

// Assuming wrapper.store is the Redux store instance
// If your wrapper works differently (e.g., provides a Provider component),
// you'll need to adjust this component accordingly.
const { store } = wrapper;

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <GtagInitializer /> {/* Place initializer inside provider if it needs store access, otherwise outside */}
      {children}
    </Provider>
  );
}