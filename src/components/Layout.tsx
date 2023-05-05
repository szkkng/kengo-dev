import { Jost } from 'next/font/google';
import Link from 'next/link';
import { ReactNode } from 'react';
import Header from './Header';

export const siteTitle = 'KENGO';

type Props = {
  children: ReactNode;
  home?: boolean;
};

const Layout = ({ children, home = false }: Props) => {
  return (
    <div className='flex-col'>
      <Header />
      <main className='container m-auto'>{children}</main>
      <footer className='h-20'>
        {home || (
          <div className='mt-10 pt-4 text-center'>
            <Link href='/' className='text-cream text-lg'>
              Home
            </Link>
          </div>
        )}
      </footer>
    </div>
  );
};

export default Layout;
