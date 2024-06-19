import '@/_styles/globals.css';
import { type Metadata } from 'next';
import { Jost } from 'next/font/google';
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

const jost = Jost({ subsets: ['latin'], weight: ['400', '500'] });

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='en' className={jost.className}>
      <body className='mx-auto max-w-2xl px-4 sm:px-0'>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
