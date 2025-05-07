'use client';

import { Provider } from 'react-redux';
// Assuming your store setup from ../store can now be imported directly
// For app directory, you typically export the store instance directly
// from your store configuration file (e.g., store/index.ts)
import { store } from '@/store';

export function StoreProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}