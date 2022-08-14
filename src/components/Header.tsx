import Link from 'next/link';
import { SiGithub, SiTwitter, SiGumroad } from 'react-icons/si';

export const Header = () => {
  return (
    <header className='py-5 border-b border-darkGrey sticky top-0 bg-matteBlack bg-opacity-90 z-10'>
      <div className='container px-6 lg:px-12 mx-auto flex items-center'>
        <Link href='/'>
          <a className='text-cream text-2xl font-semibold'>KENGO</a>
        </Link>
        <div className='flex ml-auto'>
          <a
            className='text-midGrey mr-5 text-2xl hover:text-cream'
            href='https://github.com/szkkng'
          >
            <SiGithub />
          </a>
          <a
            className='text-midGrey mr-5 text-2xl hover:text-cream'
            href='https://twitter.com/zuken_1998'
          >
            <SiTwitter />
          </a>
          <a className='text-midGrey text-2xl hover:text-cream' href='https://www.kentaro.tools'>
            <SiGumroad />
          </a>
        </div>
      </div>
    </header>
  );
};
