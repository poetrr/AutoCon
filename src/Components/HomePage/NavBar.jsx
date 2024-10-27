import React from 'react';
import { FaSearch } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className='bg-gray-800 px-4 py-3 flex justify-between fixed top-0 right-0 left-64 z-10'>
      <div className='flex items-center text-xl'>
        <span className='text-white font-semibold'>Autocon</span>
      </div>
      <div className='flex items-center gap-x-5'>
        <div className='relative md:w-65'>
          <span className='absolute inset-y-0 left-0 flex items-center pl-2'>
            <button className='p-1 focus:outline-none text-white'>
              <FaSearch className='text-gray-600' />
            </button>
          </span>
          <input
            type="text"
            className='w-full max-w-xs px-4 py-1 pl-12 rounded shadow outline-none bg-white'
            placeholder="Search..."
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;