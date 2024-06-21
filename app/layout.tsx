import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import '@/_styles/globals.css';
import { type Metadata } from 'next';
import Header from '@/_components/header';

export const metadata: Metadata = {
  title: {
    template: '%s | Kengo Suzuki',
    default: 'Kengo Suzuki',
  },
  description: 'audio plugin / web dev at kentaro.tools',
  openGraph: {
    title: 'Kengo Suzuki',
    description: 'audio plugin / web dev at kentaro.tools',
    url: 'https://kengo.dev',
    siteName: 'Kengo Suzuki',
    locale: 'en-US',
    type: 'article',
  },
  twitter: {
    card: 'summary',
    site: '@_kengo_suzuki',
  },
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='en' className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className='mx-auto max-w-2xl bg-matteBlack px-4 sm:px-0'>
        <Header />
        <main>{children}</main>
        <footer className='py-12' />
      </body>
    </html>
  );
};

export default RootLayout;
