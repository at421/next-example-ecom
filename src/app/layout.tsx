import '../assets/css/styles.scss';
import 'swiper/swiper.scss';
import 'rc-slider/assets/index.css';
import 'react-rater/lib/react-rater.css';

import { Poppins } from 'next/font/google';
import Script from 'next/script';
import ReduxProvider from '@/components/ReduxProvider'; // Assuming components folder at root
import Layout from "../layouts/Main";

import { GA_TRACKING_ID } from '@/utils/gtag'; // Assuming gtag is at '@/utils/gtag'

const isProduction = process.env.NODE_ENV === 'production';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--main-font',
});

export const metadata = {
  title: 'Your App Title', // Replace with your app title
  description: 'Your App Description', // Replace with your app description
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        {isProduction && GA_TRACKING_ID && (
          <>
            <Script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
            />
            <Script
              id="gtag-init"
              strategy="afterInteractive"
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
      <body className={poppins.variable}>
        <ReduxProvider>
          <Layout>
            {children}
          </Layout>
        </ReduxProvider>
      </body>
    </html>
  );
}