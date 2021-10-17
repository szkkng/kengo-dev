import Link from 'next/link';
import { Header } from './Header';

export const siteTitle = 'KENGO';

type Props = { home?: boolean };

export const Layout: React.FC<Props> = ({ children, home }) => {
  return (
    <>
      <Header />
      <main className='container m-auto'>{children}</main>
      {!home && (
        <div className='mt-20 mb-8 text-center'>
          <Link href='/'>
            <a className='text-milkyWhite text-lg'>Home</a>
          </Link>
        </div>
      )}
    </>
  );
};
