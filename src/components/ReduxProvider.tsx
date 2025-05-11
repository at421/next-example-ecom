'use client';

import { Provider } from 'react-redux';
import { wrapper } from '../store';
import React from 'react';

interface ReduxProviderProps {
  children: React.ReactNode;
}

const ReduxProvider: React.FC<ReduxProviderProps> = ({ children }) => {
  const { store } = wrapper.useWrappedStore(() => null);
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;