import React, { useState } from 'react';
import { Menu, Close, Brightness3, Brightness7 } from '@mui/icons-material';

import LeftSlide from './LeftSlide';
import logo from '../assets/cover/logo.png';
const NavBar = ({ setTheme, checked }) => {
  const [menuClass, setMenuClass] = useState('hidden');
  const openMenu = () => {
    if (menuClass != 'slide-in') {
      setMenuClass('slide-in');
    } else {
      setMenuClass('slide-out');
    }
  };
  return (
    <nav className="backdrop-blur-2xl  backdrop-brightness-200 dark:backdrop-brightness-50 shadow-sm border-1 px-2 sm:px-4 py-2.5 fixed top-0 left-0 right-0 bottom-auto z-10 text-gray-800 dark:text-gray-300">
      <div className="container flex flex-wrap flex-row-reverse justify-between items-center mx-auto">
        <div className="flex items-center">
          <form>
            <div className="flex space-x-1">
              <input
                type="text"
                className="flex-1 h-8 rounded-full border border-gray-600 dark:border-gray-300 bg-transparent placeholder:text-gray-600 dark:placeholder:text-gray-400 px-4 focus:outline-none w-44 sm:w-auto"
                placeholder="Search"
              />
            </div>
          </form>
          <button
            type="button"
            className="mx-2 hover:cursor-pointer rounded-xl border p-1 border-gray-600"
            onClick={setTheme}>
            {checked ? <Brightness7 /> : <Brightness3 />}
          </button>
        </div>
        <div className="flex md:order-2  items-center">
          <button
            onClick={openMenu}
            type="button"
            className=" md:hidden hover:cursor-pointer">
            {menuClass === 'slide-in' ? <Close /> : <Menu />}
          </button>
          <a href="/">
            <img
              src={logo}
              className=" mx-3 h-9 bg-slate-800 rounded-full"
              alt="Logo"
            />
          </a>
        </div>
      </div>
      <LeftSlide menuClass={menuClass} openMenu={openMenu} />
    </nav>
  );
};

export default NavBar;
