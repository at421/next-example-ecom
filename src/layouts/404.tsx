'use client';

import { usePathname } from "next/navigation";
import Header from "@/components/header";

type LayoutType = {
  title?: string;
  children?: React.ReactNode;
};

const ErrorPage = ({ children, title }: LayoutType) => {
  const pathname = usePathname();

  // In the app router, metadata (like title) is typically handled by
  // exporting a metadata object from layout.tsx or page.tsx files.
  // The 'title' prop is retained here for compatibility with the original
  // component signature, but it won't directly set the document title from here.

  return (
    <div className="app-main">
      {/* The original Head component is replaced by metadata export in app router */}
      {/* <Head>...</Head> */}

      <Header isErrorPage />

      {/* Use usePathname from next/navigation */}
      <main className={pathname !== "/" ? "main-page" : ""}>{children}</main>
    </div>
  );
};

export default ErrorPage;