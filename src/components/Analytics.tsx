"use client";

import { useEffect, Fragment } from "react";
import Router from "next/router"; // Note: Using next/router in app directory client component
import * as gtag from "@/utils/gtag"; // Adjust path based on your file structure

const isProduction = process.env.NODE_ENV === "production";

const Analytics = () => {
  useEffect(() => {
    if (isProduction) {
      const handleRouteChange = (url: string) => {
        gtag.pageview(url);
      };
      Router.events.on("routeChangeComplete", handleRouteChange);

      return () => {
        Router.events.off("routeChangeComplete", handleRouteChange);
      };
    }
  }, []);

  return (
    <Fragment>
      {isProduction && (
        <>
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', '${gtag.GA_TRACKING_ID}', {
                  page_path: window.location.pathname,
                });
              `,
            }}
          />
        </>
      )}
    </Fragment>
  );
};

export default Analytics;