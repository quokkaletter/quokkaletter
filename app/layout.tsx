import './globals.css';

import { Analytics } from '@components/analytics';
import { AuthSession } from 'components/common/auth/AuthSession';
import QueryProvider from 'components/common/query/QueryProvider';
import CONFIG from 'site.config';
import { Toaster } from 'sonner';
import { jua } from 'utils/fonts';

/**
 * @description
 * image는 png 파일로 대체했음
 */
export const metadata = {
  metadataBase: new URL(CONFIG.url),
  title: CONFIG.title,
  description: CONFIG.description,
  icons: {
    icon: {
      url: '/favicon.png',
      type: 'image/png',
      sizes: '32x32',
    },
  },

  openGraph: {
    title: CONFIG.title,
    description: CONFIG.description,
    url: CONFIG.url,
    siteName: CONFIG.title,
    locale: 'ko-KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: CONFIG.title,
    description: CONFIG.description,
  },
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html>
      <body className={`${jua.className}`}>
        <Analytics />
        <div id="modal" />
        <AuthSession>
          <Toaster
            toastOptions={{
              duration: 3000,
            }}
            position="top-center"
          />
          <QueryProvider>
            <main className="mx-auto max-w-[600px] h-screen">
              {children}
              <div className="absolute right-0 bottom-0 h-screen w-[calc(50%-300px)] bg-white" />
            </main>
          </QueryProvider>
        </AuthSession>
      </body>
    </html>
  );
}
