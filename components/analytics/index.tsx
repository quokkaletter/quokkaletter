'use client';

import { useGtagEffect } from 'hooks/useGtagEffect';
import Script from 'next/script';

const GA_TRACKING_ID = 'G-D4V1L7P2DG';

export const Analytics = () => {
  const isProduction = process.env.NODE_ENV === 'production';
  useGtagEffect();

  return isProduction ? (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script
        id="gtag"
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
  ) : null;
};
