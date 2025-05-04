import "../assets/css/styles.scss";
import "swiper/swiper.scss";
import "rc-slider/assets/index.css";
import "react-rater/lib/react-rater.css";

import { Poppins } from "next/font/google";
import ReduxProvider from "@/components/ReduxProvider"; // Assuming components folder is at root

import { GA_TRACKING_ID } from "@/utils/gtag"; // Adjust path as needed

const isProduction = process.env.NODE_ENV === "production";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--poppins-font", // Use a CSS variable for the font
});

// You can add metadata here
// export const metadata = {
//   title: 'Your App Title',
//   description: 'Your App Description',
// }

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
              src={`https://www.googletmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
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
        {/* Other head elements like favicon, meta tags can go here */}
      </head>
      <body>
        {/* ReduxProvider needs to be a client component */}
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}