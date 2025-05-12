import Header from "@/components/header";
import React from 'react';

export const metadata = {
  title: "Page not found — Next.js Ecommerce",
};

interface NotFoundProps {
  children?: React.ReactNode;
}

const NotFound: React.FC<NotFoundProps> = ({ children }) => {
  return (
    <div className="app-main">
      <Header isErrorPage />

      <main className="main-page">
        <div style={{ textAlign: 'center', padding: '50px 0' }}>
          <h1>404</h1>
          <h2>Page Not Found</h2>
          <p>Sorry, the page you are looking for does not exist.</p>
        </div>
      </main>
    </div>
  );
};

export default NotFound;