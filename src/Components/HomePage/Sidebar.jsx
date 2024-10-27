import React from 'react';
import { FaHome, FaUser, FaSignOutAlt, FaRegFileAlt, FaCalculator } from 'react-icons/fa';

const Sidebar = ({ onProjectsClick }) => {
  return (
    <div className='w-64 bg-gray-800 fixed h-screen px-4 py-2 top-0 left-0 overflow-y-auto z-20'>
      <div className='my-2 mb-4'>
        <h2 className='text-2xl text-white font-bold'>
          <FaHome className="inline-block w-6 h-6 mr-2 -mt-2" />
          Autocon
        </h2>
      </div>
      <hr className='border-t border-gray-600' />
      <ul className='mt-3 text-white font-bold'>
        <li className='mb-2 rounded hover:shadow hover:bg-blue-500 py-2'>
          <a href="" className='px-3 text-white no-underline flex items-center'>
            <FaUser className='w-6 h-6 mr-2' />
            Profile
          </a>
        </li>
        <li className='mb-2 rounded hover:shadow hover:bg-blue-500 py-2' onClick={onProjectsClick}>
          <a href="" className='px-3 text-white no-underline flex items-center'>
            <FaRegFileAlt className="w-6 h-6 mr-2" />
            Projects
          </a>
        </li>
        <li className='mb-2 rounded hover:shadow hover:bg-blue-500 py-2'>
          <a href="" className='px-3 text-white no-underline flex items-center'>
            <FaCalculator className="w-8 h-6 mr-2" />
            Material Calculator
          </a>
        </li>
        <li className='mb-2 rounded hover:shadow hover:bg-blue-500 py-2'>
          <a href="" className='px-3 text-white no-underline flex items-center'>
            <FaSignOutAlt className="w-6 h-6 mr-2" />
            Logout
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;