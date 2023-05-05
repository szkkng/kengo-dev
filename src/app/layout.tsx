import 'highlight.js/styles/github-dark.css';
import '@/styles/globals.css';
import { Jost } from 'next/font/google';

export const metadata = {
  title: 'Home',
  description: 'Welcome to Next.js',
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
