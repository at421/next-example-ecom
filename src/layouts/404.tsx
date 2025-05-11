'use client';

import { usePathname } from "next/navigation";
import Header from "@/components/header";

// This component replaces the content of the original pages/404.tsx
// which likely used the src/layouts/404.tsx layout.
// It's a Client Component because it uses usePathname.
// Metadata like title cannot be exported directly from a client component.
// Relying on root layout metadata or browser default title.

const NotFound = () => {
  const pathname = usePathname();

  return (
    <div className="app-main">
      {/* The original layout included Head for title.
          In app router client components, metadata is handled differently
          (ideally via server components or layout.tsx metadata export).
          Omitting direct client-side title manipulation.
      */}

      {/* Render the Header, potentially with error-specific styling */}
      <Header isErrorPage />

      {/* Main content area, adjust class based on pathname */}
      <main className={pathname !== "/" ? "main-page" : ""}>
        {/* This is the actual 404 content that would have been passed as children */}
        <div className="container" style={{ textAlign: 'center', padding: '50px 0' }}>
          <h1>404 - Page Not Found</h1>
          <p>Sorry, the page you are looking for does not exist.</p>
          {/* Optional: Add a link back home */}
          {/* <a href="/">Go to Home</a> */}
        </div>
      </main>
    </div>
  );
};

export default NotFound;