import Header from "@/components/header";

export const metadata = {
  title: "Page not found — Next.js Ecommerce",
};

const NotFound = () => {
  return (
    <div className="app-main">
      <Header isErrorPage />

      <main className="main-page">
        {/* Original component expected children, but app/not-found.tsx is the page content itself */}
        {/* Adding a default "Page Not Found" message */}
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