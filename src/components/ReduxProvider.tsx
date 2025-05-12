'use client';

import { Provider } from 'react-redux';
import { wrapper } from '../store';
import React from 'react';

const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  // next-redux-wrapper v8 uses useWrappedStore
  const { store } = wrapper.useWrappedStore({});

  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;