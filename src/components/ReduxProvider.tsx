'use client';

import { Provider } from 'react-redux';
import { store } from '../store'; // Assuming '../store' exports the store instance

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}