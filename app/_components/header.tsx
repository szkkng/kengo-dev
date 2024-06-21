import Link from 'next/link';

const Header = () => {
  return (
    <header className='py-5'>
      <div className='flex items-center'>
        <Link href='/' className='text-xl text-cream hover:text-cream/75'>
          Kengo Suzuki
        </Link>
        <nav className='ml-auto mt-[5px] flex items-center text-sm'>
          <a className='text-midGrey hover:text-cream' href='https://github.com/szkkng'>
            GitHub
          </a>
          <a className='ml-5 text-midGrey hover:text-cream' href='https://kentaro.tools'>
            kentaro.tools
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
