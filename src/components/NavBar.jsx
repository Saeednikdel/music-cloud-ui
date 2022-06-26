import React, { useState } from 'react';
import { MoonIcon, SunIcon, MenuIcon, XIcon } from '@heroicons/react/solid';
import logo from '../assets/cover/logo.png';
const NavBar = ({ setTheme, checked }) => {
  const menuClass = 'slide-out';
  return (
    <nav className="backdrop-blur-2xl backdrop-brightness-50 shadow-sm border-1 px-2 sm:px-4 py-2.5 fixed top-0 left-0 right-0 bottom-auto z-10">
      <div className="container flex flex-wrap flex-row-reverse justify-between items-center mx-auto">
        <div className="flex items-center">
          <button
            type="button"
            className="mx-2 hover:cursor-pointer rounded-xl border p-1 border-gray-600"
            onClick={setTheme}>
            {checked ? (
              <SunIcon className="h-6 w-6 active:animate-spin text-gray-300" />
            ) : (
              <MoonIcon className="h-6 w-6 active:animate-spin text-gray-300" />
            )}
          </button>
        </div>
        <div className="flex md:order-2  items-center">
          <button type="button" className=" md:hidden hover:cursor-pointer">
            {menuClass == 'slide-in' ? (
              <XIcon className="h-8 w-8 active:animate-spin text-gray-300" />
            ) : (
              <MenuIcon className="h-8 w-8 active:animate-spin text-gray-300" />
            )}
          </button>
          <a href="#">
            <img src={logo} className=" mx-3 h-9" alt="Logo" />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
