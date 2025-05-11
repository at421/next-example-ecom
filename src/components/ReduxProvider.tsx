'use client';

import { wrapper } from '@/store';
import React from 'react';

const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default wrapper.withRedux(ReduxProvider);