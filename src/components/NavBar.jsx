import React, { useState } from 'react';
import {
  Menu,
  Close,
  Brightness3,
  Brightness7,
  ArrowBack,
} from '@mui/icons-material';
import OutsideClickHandler from 'react-outside-click-handler';
import LeftSlide from './LeftSlide';

const NavBar = ({ setTheme, checked }) => {
  const [openLeftMenu, setOpenLeftMenu] = useState(false);
  return (
    <nav className="backdrop-blur-2xl  backdrop-brightness-200 dark:backdrop-brightness-50 shadow-sm border-1 px-2 sm:px-4 py-2.5 fixed top-0 left-0 right-0 bottom-auto z-10 text-gray-800 dark:text-gray-300">
      <div className="container flex flex-wrap flex-row-reverse justify-between items-center mx-auto md:px-8 xl:px-16">
        <div className="flex items-center space-x-3">
          <form>
            <div className="flex space-x-1">
              <input
                type="text"
                className="flex-1 h-8 rounded-full border border-gray-600 dark:border-gray-300 bg-transparent placeholder:text-gray-600 dark:placeholder:text-gray-400 px-4 focus:outline-none w-44 md:w-auto"
                placeholder="Search"
              />
            </div>
          </form>
          <button
            type="button"
            className="mx-2 hover:cursor-pointer rounded-xl border p-1 border-gray-600 active:text-blue-600"
            onClick={setTheme}>
            {checked ? <Brightness7 /> : <Brightness3 />}
          </button>
        </div>
        <div className="flex items-center space-x-3">
          <OutsideClickHandler
            disabled={!openLeftMenu}
            onOutsideClick={() => setOpenLeftMenu(!openLeftMenu)}>
            <button
              onClick={() => setOpenLeftMenu(!openLeftMenu)}
              type="button"
              className=" md:hidden hover:cursor-pointer active:text-blue-600">
              {openLeftMenu ? (
                <Close style={{ fontSize: 30 }} />
              ) : (
                <Menu style={{ fontSize: 30 }} />
              )}
            </button>
            <LeftSlide
              openLeftMenu={openLeftMenu}
              setOpenLeftMenu={setOpenLeftMenu}
            />
          </OutsideClickHandler>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
