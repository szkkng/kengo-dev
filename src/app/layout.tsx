import 'highlight.js/styles/github-dark.css';
import '@/styles/globals.css';
import { Metadata } from 'next';
import { Jost } from 'next/font/google';

const siteName = 'KENGO';
const description = 'audio plugin developer at kentaro';
export const metadata: Metadata = {
  title: siteName,
  description: description,
  openGraph: {
    title: siteName,
    description: description,
    url: 'https://kengo.dev',
    siteName: siteName,
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
    description: description,
    creator: '@kng_dev',
    images: ['https://kengo.dev/images/stranular/stranular.png'],
  },
};

const jost = Jost({ subsets: ['latin'], weight: ['400', '500'] });

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='en' className={jost.className}>
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
