'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/header';

const NotFoundUI = () => {
  const pathname = usePathname();

  return (
    <div className="app-main">
      <Header isErrorPage />

      <main className={pathname !== '/' ? 'main-page' : ''}>
        {/* Content for the 404 page */}
        <div className="container" style={{ textAlign: 'center', padding: '50px 0' }}>
          <h1>404 - Page Not Found</h1>
          <p>Sorry, the page you are looking for does not exist.</p>
        </div>
      </main>
    </div>
  );
};

export default NotFoundUI;