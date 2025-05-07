// global styles
import "../assets/css/styles.scss";
import "swiper/swiper.scss";
import "rc-slider/assets/index.css";
import "react-rater/lib/react-rater.css";

import { Poppins } from "next/font/google";

// Assuming GA_TRACKING_ID is still exported from utils/gtag
import { GA_TRACKING_ID } from "@/utils/gtag";

// Import the client-side providers
import { StoreProvider } from "@/components/StoreProvider";
import { Analytics } from "@/components/Analytics";
import Layout from "../layouts/Main";

const isProduction = process.env.NODE_NODE === "production";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--main-font", // Define CSS variable
});

// Optional: Define metadata for the root layout
// export const metadata = {
//   title: 'Your App Title',
//   description: 'Your App Description',
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics - added conditionally based on production */}
        {isProduction && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_TRACKING_ID}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}
      </head>
      <body className={poppins.variable}> {/* Apply font variable class */}
        <StoreProvider> {/* Wrap children with Redux Provider */}
          <Analytics /> {/* Add Analytics component for pageview tracking */}
          <Layout>
            {children} {/* This is where your page content will be rendered */}
          </Layout>
        </StoreProvider>
      </body>
    </html>
  );
}