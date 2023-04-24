import { Icon } from '@iconify/react';
import Link from 'next/link';

const Header = () => {
  return (
    <header className='py-5 border-b border-darkGrey sticky top-0 bg-matteBlack bg-opacity-90 z-10'>
      <div className='container px-6 lg:px-12 mx-auto flex items-center'>
        <Link href='/' className='text-cream text-2xl font-semibold'>
          KENGO
        </Link>
        <div className='flex ml-auto'>
          <a
            className='text-midGrey mr-4 text-3xl hover:text-cream'
            href='https://github.com/szkkng'
          >
            <Icon icon='mdi:github' />
          </a>
          <a
            className='text-midGrey mr-4 text-3xl hover:text-cream'
            href='https://twitter.com/kng_dev'
          >
            <Icon icon='mdi:twitter' />
          </a>
          <a className='text-midGrey text-3xl hover:text-cream' href='https://www.kentaro.tools'>
            <Icon icon='tabler:brand-gumroad' />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
