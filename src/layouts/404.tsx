'use client';

import { usePathname } from 'next/navigation';

import Header from '@/components/header';

// The not-found page in app router does not receive children like a traditional layout
// and its metadata is handled by exporting a metadata object.

const NotFoundPage = () => {
  const pathname = usePathname();

  // The conditional class based on pathname !== "/" might not be strictly necessary
  // for a 404 page as the pathname will never be "/", but kept for functional
  // equivalence of the original component's logic.
  const mainClass = pathname !== '/' ? 'main-page' : '';

  return (
    <div className="app-main">
      {/* Metadata (title) is handled by the exported metadata object in app router */}

      <Header isErrorPage />

      <main className={mainClass}>
        {/* The content of your 404 page goes here.
            The original component rendered 'children', but not-found.tsx is the content itself.
            You might want to add specific 404 text/UI here.
        */}
        <div className="container" style={{ textAlign: 'center', padding: '50px 0' }}>
          <h1>404 - Page Not Found</h1>
          <p>The page you are looking for does not exist.</p>
        </div>
      </main>
    </div>
  );
};

export default NotFoundPage;

// Add metadata export for the title if this was a page component.
// For not-found.tsx, metadata is typically handled by the exported metadata object.
// export const metadata = {
//   title: 'Page not found — Next.js Ecommerce',
// };