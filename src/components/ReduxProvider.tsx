'use client';

import { Provider } from 'react-redux';
import { wrapper } from '@/store'; // Assuming store is now at '@/store'

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  // Ensure store is initialized if wrapper.store is not already the store instance
  // Depending on your store setup, wrapper might need to be used differently in app dir
  // This assumes wrapper.store exposes the Redux store instance directly or via getStore()
  // You might need to adjust this based on your actual store implementation for app dir
  const { store } = wrapper; // Adjust based on your wrapper implementation

  return <Provider store={store}>{children}</Provider>;
}