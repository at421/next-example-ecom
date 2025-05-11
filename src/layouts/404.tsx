'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/header';

export const metadata = {
  title: 'Page not found',
};

const NotFoundPage = () => {
  const pathname = usePathname();

  return (
    <div className="app-main">
      <Header isErrorPage />

      <main className={pathname !== '/' ? 'main-page' : ''}>
        {/* Add your 404 page content here */}
        <div style={{ textAlign: 'center', padding: '50px 20px' }}>
          <h1>404 - Page Not Found</h1>
          <p>Sorry, the page you are looking for does not exist.</p>
          {/* Example: Add a link back home */}
          {/* <Link href="/">Go to Homepage</Link> */}
        </div>
      </main>
    </div>
  );
};

export default NotFoundPage;