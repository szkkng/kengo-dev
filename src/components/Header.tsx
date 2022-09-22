import { Icon } from '@iconify/react';
import Link from 'next/link';

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
            <Icon icon="akar-icons:github-fill" />
          </a>
          <a
            className='text-midGrey mr-5 text-2xl hover:text-cream'
            href='https://linktr.ee/zuken_1998'
          >
            <Icon icon="simple-icons:linktree" />
          </a>
          <a className='text-midGrey text-2xl hover:text-cream' href='https://www.kentaro.tools'>
            <Icon icon="simple-icons:gumroad" />
          </a>
        </div>
      </div>
    </header>
  );
};
