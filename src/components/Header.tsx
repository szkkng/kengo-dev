import Link from 'next/link';
import { SiGithub, SiTwitter, SiGumroad } from 'react-icons/si';

export const Header = () => {
  return (
    <header className='py-5 border-b border-darkGray sticky top-0 bg-matteBlack bg-opacity-90 z-10'>
      <div className='container px-6 lg:px-12 mx-auto flex items-center'>
        <Link href='/'>
          <a className='text-milkyWhite text-2xl font-semibold'>KENGO</a>
        </Link>
        <div className='flex ml-auto'>
          <a
            className='text-midGray mr-5 text-2xl hover:text-milkyWhite'
            href='https://github.com/szkkng'
          >
            <SiGithub />
          </a>
          <a
            className='text-midGray mr-5 text-2xl hover:text-milkyWhite'
            href='https://twitter.com/zuken_1998'
          >
            <SiTwitter />
          </a>
          <a
            className='text-midGray text-2xl hover:text-milkyWhite'
            href='https://www.kentaro.tools'
          >
            <SiGumroad />
          </a>
        </div>
      </div>
    </header>
  );
};
