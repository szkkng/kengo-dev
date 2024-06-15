import Link from 'next/link';
import { FaGithub, FaXTwitter } from 'react-icons/fa6';
import { TbBrandGumroad } from 'react-icons/tb';

const Header = () => {
  return (
    <header className='sticky top-0 z-10 border-b border-darkGrey bg-matteBlack/90 py-5'>
      <div className='container mx-auto flex items-center px-6 lg:px-12'>
        <Link href='/' className='text-2xl font-semibold text-cream'>
          KENGO
        </Link>
        <div className='ml-auto flex items-center text-2xl hover:text-cream'>
          <a className='mr-5 text-midGrey hover:text-cream' href='https://github.com/szkkng'>
            <FaGithub />
          </a>
          <a className='mr-[18px] text-midGrey hover:text-cream' href='https://x.com/_kengo_suzuki'>
            <FaXTwitter />
          </a>
          <a className='text-midGrey hover:text-cream' href='https://szk-1992.gumroad.com'>
            <TbBrandGumroad size='1.15em' />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
