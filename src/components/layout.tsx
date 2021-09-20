import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { GithubIcon, TwitterIcon, YoutubeIcon } from 'components/icons';

const name = 'Suzuki Kengo';
export const siteTitle = 'KENGO';

type Props = { home?: boolean };

export const Layout: React.FC<Props> = ({ children, home }) => {
  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <link rel='icon' href='favicon.png' />
        <meta name='description' content="suzuki kengo's blog" />
        <meta name='og:title' content={siteTitle} />
        <meta name='twitter:card' content='summary_large_image' />
      </Head>
      <header className='flex mt-5 sm:mt-7 mb-16'>
        <Link href='/'>
          <a className='text-offWhite text-3xl sm:text-4xl font-bold mt-5 sm:mt-7 mb-12'>KENGO</a>
        </Link>
        <div className='flex mt-16 sm:mt-20 ml-auto'>
          <a className='text-gray-500 mr-4 text-2xl sm:text-3xl' href='https://github.com/szkkng'>
            <GithubIcon />
          </a>
          <a
            className='text-gray-500 mr-4 text-2xl sm:text-3xl'
            href='https://twitter.com/zuken_1998'
          >
            <TwitterIcon />
          </a>
          <a
            className='text-gray-500 text-2xl sm:text-3xl'
            href='https://www.youtube.com/channel/UCbYvkmJhbgt01FQKUdVJMWw/featured'
          >
            <YoutubeIcon />
          </a>
        </div>
      </header>
      <main className='flex-1'>{children}</main>
      {!home && (
        <div className='mt-10'>
          <Link href='/'>
            <a>← Home</a>
          </Link>
        </div>
      )}
      <footer className='m-10 mb-3 text-center'>
        <h3 className='text-gray-600 text-sm'>© 2021 All rights reserved.</h3>
      </footer>
    </div>
  );
};
