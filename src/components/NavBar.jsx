import React, { useState } from 'react';
import {
  Menu,
  Close,
  Brightness3,
  Brightness7,
  QueueMusicOutlined,
  ArrowBack,
} from '@mui/icons-material';
import OutsideClickHandler from 'react-outside-click-handler';
import RightSlide from './RightSlide';
import LeftSlide from './LeftSlide';
import logo from '../assets/cover/logo.png';

const NavBar = ({
  setTheme,
  checked,
  index,
  skip,
  fullPlayer,
  setFullPlayer,
}) => {
  const [leftClass, setLeftClass] = useState('hidden');
  const [rightClass, setRightClass] = useState('hidden');
  const openLeftMenu = () => {
    if (leftClass !== 'slide-in') {
      setLeftClass('slide-in');
      if (rightClass === 'slide-in-right') {
        setRightClass('slide-out-right');
      }
    } else {
      setLeftClass('slide-out');
    }
  };
  const openRightMenu = () => {
    if (rightClass !== 'slide-in-right') {
      setRightClass('slide-in-right');
      if (leftClass === 'slide-in') {
        setLeftClass('slide-out');
      }
    } else {
      setRightClass('slide-out-right');
    }
  };
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
            className="mx-2 hover:cursor-pointer rounded-xl border p-1 border-gray-600"
            onClick={setTheme}>
            {checked ? <Brightness7 /> : <Brightness3 />}
          </button>
          <OutsideClickHandler
            disabled={rightClass !== 'slide-in-right'}
            onOutsideClick={openRightMenu}>
            <button
              type="button"
              className=" md:hidden hover:cursor-pointer"
              onClick={openRightMenu}>
              {rightClass === 'slide-in-right' ? (
                <Close />
              ) : (
                <QueueMusicOutlined />
              )}
            </button>
            <RightSlide
              rightClass={rightClass}
              openRightMenu={openRightMenu}
              index={index}
              skip={skip}
            />
          </OutsideClickHandler>
        </div>
        <div className="flex items-center space-x-3">
          <OutsideClickHandler
            disabled={leftClass !== 'slide-in'}
            onOutsideClick={openLeftMenu}>
            <button
              onClick={openLeftMenu}
              type="button"
              className=" md:hidden hover:cursor-pointer">
              {leftClass === 'slide-in' ? <Close /> : <Menu />}
            </button>
            <LeftSlide leftClass={leftClass} openLeftMenu={openLeftMenu} />
          </OutsideClickHandler>
          {fullPlayer && (
            <ArrowBack
              className="hover:cursor-pointer mt-1"
              onClick={() => setFullPlayer(false)}
            />
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
