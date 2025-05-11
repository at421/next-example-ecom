'use client';

import { Provider } from 'react-redux';
// Assuming your store setup is exported from '@/store'
// You might need to adapt this import based on your actual store file location
import { store } from '@/store'; // Example: if '@/store/index.ts' exports 'store'

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider store={store}>{children}</Provider>;
}