import "../assets/css/styles.scss";
import "swiper/swiper.scss";
import "rc-slider/assets/index.css";
import "react-rater/lib/react-rater.css";
import Layout from "../layouts/Main";

import { Poppins } from "next/font/google";
import StoreProvider from "@/components/StoreProvider";
import AnalyticsProvider from "@/components/AnalyticsProvider";
import { GA_TRACKING_ID } from "@/utils/gtag";

const isProduction = process.env.NODE_ENV === "production";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--poppins-font",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.variable}>
      <head>
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
      <body>
        <StoreProvider>
          <AnalyticsProvider>
            <Layout>
              {children}
            </Layout>
          </AnalyticsProvider>
        </StoreProvider>
      </body>
    </html>
  );
}