import Link from 'next/link';
import { Header } from './Header';

export const siteTitle = 'KENGO';

type Props = { home?: boolean };

export const Layout: React.FC<Props> = ({ children, home }) => {
  return (
    <>
      <Header />
      <main className='container m-auto'>{children}</main>
      <footer className='h-20'>
        {!home && (
          <div className='mt-10 pt-4 text-center'>
            <Link href='/'>
              <a className='text-cream text-lg'>Home</a>
            </Link>
          </div>
        )}
      </footer>
    </>
  );
};
