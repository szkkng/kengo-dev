import Link from 'next/link';
import { Header } from './Header';

export const siteTitle = 'KENGO';

type Props = { home?: boolean };

export const Layout: React.FC<Props> = ({ children, home }) => {
  return (
    <>
      <Header />
      <main className='w-11/12 md:w-7/12 mx-auto my-14'>{children}</main>
      {!home && (
        <div className='mt-40 mb-10 text-center'>
          <Link href='/'>
            <a className='text-milkyWhite'>← Home</a>
          </Link>
        </div>
      )}
    </>
  );
};
