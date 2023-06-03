import Link from 'next/link';
import { FaGithub, FaTwitter } from 'react-icons/fa';
import { TbBrandGumroad } from 'react-icons/tb';

const Header = () => {
  return (
    <header className='py-5 border-b border-darkGrey sticky top-0 bg-matteBlack bg-opacity-90 z-10'>
      <div className='container px-6 lg:px-12 mx-auto flex items-center'>
        <Link href='/' className='text-cream text-2xl font-semibold'>
          KENGO
        </Link>
        <div className='flex ml-auto items-center text-2xl hover:text-cream'>
          <a className='text-midGrey mr-5 hover:text-cream' href='https://github.com/szkkng'>
            <FaGithub />
          </a>
          <a
            className='text-midGrey mr-[18px] hover:text-cream'
            href='https://twitter.com/_suzuki_kengo'
          >
            <FaTwitter />
          </a>
          <a className='text-midGrey hover:text-cream' href='https://www.kentaro.tools'>
            <TbBrandGumroad size='1.15em' />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
