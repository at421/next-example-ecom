'use client';

import { Provider } from 'react-redux';
// Assuming your Redux store is configured and exported from '@/store'
// You might need to adapt this based on how your store is initialized
import { store } from '@/store'; // Adjust the import path if necessary

export function StoreProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}