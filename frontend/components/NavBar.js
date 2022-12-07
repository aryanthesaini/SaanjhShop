import React from 'react';
import Link from 'next/link';

const NavBar = ({ cart }) => {
  return (
    <div>
      <header className='text-gray-600 body-font'>
        <div className='container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center'>
          <Link
            href='/'
            className='flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0'>
            <span className='ml-3 text-xl'>Saanjh Candles</span>
          </Link>
          <nav className='md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center'>
            <Link href='/' className='mr-5 hover:text-gray-900'>
              Home
            </Link>
            {/* <Link href='/about' className='mr-5 hover:text-gray-900'>
              About
            </Link> */}
            <Link href='/products' className='mr-5 hover:text-gray-900'>
              Products
            </Link>

            <Link href='/contact' className='mr-5 hover:text-gray-900'>
              Contact us
            </Link>
            <Link href='/checkout' className='mr-5 hover:text-gray-900'>
              Cart({cart.length})
            </Link>
          </nav>
          <button className='inline-block px-6 py-2 border-2 border-blue-500 text-blue-500 font-medium text-xs leading-tight uppercase rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out mt-2'>
            Login{' '}
          </button>
        </div>
      </header>
    </div>
  );
};

export default NavBar;
