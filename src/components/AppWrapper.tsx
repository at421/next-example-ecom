'use client';

import React, { Fragment, useEffect } from 'react';
import { usePathname } from 'next/navigation';

import { wrapper } from '@/store';
import * as gtag from '@/utils/gtag';

const isProduction = process.env.NODE_ENV === "production";

const ReduxProvider = wrapper.withRedux(({ children }: { children: React.ReactNode }) => <>{children}</>);

const AppWrapper = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();

    useEffect(() => {
        if (isProduction && pathname) {
            gtag.pageview(pathname);
        }
    }, [pathname]);

    return (
        <ReduxProvider>
            {children}
        </ReduxProvider>
    );
};

export default AppWrapper;