'use client';

import { usePathname } from "next/navigation";

import Header from "@/components/header";

type LayoutType = {
  title?: string; // Note: title prop is ignored as metadata is handled differently in app router
  children?: React.ReactNode;
};

const ErrorPageLayout = ({ children }: LayoutType) => {
  const pathname = usePathname();

  return (
    <div className="app-main">
      <Header isErrorPage />

      <main className={pathname !== "/" ? "main-page" : ""}>{children}</main>
    </div>
  );
};

export default ErrorPageLayout;