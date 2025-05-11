import '@/assets/css/styles.scss';
import 'swiper/swiper.scss';
import 'rc-slider/assets/index.css';
import 'react-rater/lib/react-rater.css';

import { Poppins } from 'next/font/google';
import ReduxProvider from '@/components/ReduxProvider';
import Analytics from '@/components/Analytics';
import { GA_TRACKING_ID } from '@/utils/gtag'; // Assuming '@/utils/gtag' exists
import Layout from "../layouts/Main";

const isProduction = process.env.NODE_ENV === 'production';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--main-font',
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
              id="gtag-init"
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
        <Layout>
          <ReduxProvider>
            {children}
          </ReduxProvider>
        </Layout>
        {/* Analytics component handles route change tracking */}
        <Analytics />
      </body>
    </html>
  );
}