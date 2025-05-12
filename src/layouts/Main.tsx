'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/header';

type LayoutType = {
  children?: React.ReactNode;
};

const MainLayout = ({ children }: LayoutType) => {
  const pathname = usePathname();

  return (
    <div className="app-main">
      {/* Metadata is handled via export const metadata = {} in app/layout.tsx or page.tsx */}
      <Header />
      <main className={pathname !== "/" ? "main-page" : ""}>{children}</main>
    </div>
  );
};

export default MainLayout;