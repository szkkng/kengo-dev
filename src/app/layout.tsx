import 'highlight.js/styles/github-dark.css';
import '@/styles/globals.css';

export const metadata = {
  title: 'Home',
  description: 'Welcome to Next.js',
};

// export default function RootLayout({ children }: { children: React.ReactNode }) {
const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
