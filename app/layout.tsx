import '@/_styles/globals.css';
import { type Metadata } from 'next';
import { Jost } from 'next/font/google';
import Header from '@/_components/header';

const siteName = 'KENGO';
const description = 'audio plugin developer at kentaro';
export const metadata: Metadata = {
  title: siteName,
  description,
  openGraph: {
    title: siteName,
    description,
    url: 'https://kengo.dev',
    siteName,
    images: [
      {
        url: 'https://kengo.dev/images/stranular/stranular.png',
        width: 800,
        height: 600,
      },
    ],
    locale: 'en-US',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteName,
    description,
    creator: '@kng_dev',
    images: ['https://kengo.dev/images/stranular/stranular.png'],
  },
};

const jost = Jost({ subsets: ['latin'], weight: ['400', '500'] });

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='en' className={jost.className}>
      <body>
        <Header />
        <main className='container mx-auto mb-10'>{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
