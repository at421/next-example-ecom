import "../assets/css/styles.scss";
import "swiper/swiper.scss";
import "rc-slider/assets/index.css";
import "react-rater/lib/react-rater.css";

import { Poppins } from "next/font/google";
import React from "react";

import Layout from "../layouts/Main";
import { GA_TRACKING_ID } from "@/utils/gtag";
import ReduxProvider from "@/components/ReduxProvider";
import GATracker from "@/components/GATracker";

const isProduction = process.env.NODE_ENV === "production";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--main-font",
});

// Optional: Add metadata if needed, but not present in original _app/_document
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
    <html lang="en" className={poppins.variable}>
      <head>
        {/* We only want to add the scripts if in production */}
        {isProduction && (
          <>
            {/* Global Site Tag (gtag.js) - Google Analytics */}
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
      <body>
        <ReduxProvider>
          <Layout>
            {children}
          </Layout>
        </ReduxProvider>
        {/* Add the GA tracker component */}
        <GATracker />
      </body>
    </html>
  );
}