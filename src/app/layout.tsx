import { Suspense } from 'react';
import { Fira_Code } from 'next/font/google';
import cn from 'classnames';
import { QueryClientProvider } from '@/app/shared/query-client-provider';
import { ThemeProvider } from '@/app/shared/theme-provider';
import WagmiConfig from '@/app/shared/wagmi-config';
import ModalsContainer from '@/components/modal-views/container';
import DrawersContainer from '@/components/drawer-views/container';
import SettingsButton from '@/components/settings/settings-button';
import SettingsDrawer from '@/components/settings/settings-drawer';
// base css file
import 'overlayscrollbars/overlayscrollbars.css';
import 'swiper/css';
import 'swiper/css/pagination';
import '@/assets/css/scrollbar.css';
import '@/assets/css/globals.css';
import '@/assets/css/range-slider.css';
import Image from 'next/image';
import Avatar from '@/assets/images/author.jpg';
import LandingPage from '@/assets/images/landing-page.jpg';
import Gallery1 from '@/assets/images/landing/gallery-1.jpg';
import Gallery2 from '@/assets/images/landing/gallery-2.jpg';

const fira_code = Fira_Code({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: 'BitRegalo®',
  description: 'BitRegalo®',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr" className={cn('light', fira_code.className)}>
      <head>
        {/* maximum-scale 1 meta tag need to prevent ios input focus auto zooming */}
        <link rel="icon" href="/favicon.png" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1 maximum-scale=1"
        />
        <meta name="description" content="BitRegalo"></meta>
      </head>
      <body>
        <QueryClientProvider>
          <ThemeProvider>
            <WagmiConfig>
              <SettingsButton />
              <SettingsDrawer />
              <Suspense fallback={null}>
                <ModalsContainer />
                <DrawersContainer />
              </Suspense>
              {children}
            </WagmiConfig>
          </ThemeProvider>

          {/* <Landing /> */}
        </QueryClientProvider>
      </body>
    </html>
  );
}
