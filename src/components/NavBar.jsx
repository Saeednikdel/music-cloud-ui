import {
  Brightness3,
  Brightness7,
  Close,
  Menu,
  Search,
} from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { checkAuthenticated, load_user } from '../actions/auth';

import LeftSlide from './LeftSlide';
import OutsideClickHandler from 'react-outside-click-handler';
import { connect } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
const NavBar = ({ setTheme, checked, checkAuthenticated, load_user }) => {
  const location = useLocation().pathname.split('/')[1];
  const navigate = useNavigate();
  const [openLeftMenu, setOpenLeftMenu] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        checkAuthenticated();
        load_user();
      } catch (err) {}
    };
    fetchData();
  }, []);
  return (
    <nav className="backdrop-blur-2xl  backdrop-brightness-200 dark:backdrop-brightness-50 shadow-sm border-1 px-2 sm:px-4 py-2.5 md:py-3 fixed top-0 right-0 left-0 bottom-auto z-10 text-gray-800 dark:text-gray-300">
      <div className="container flex flex-wrap flex-row-reverse justify-between items-center mx-auto md:px-8 xl:px-16">
        <div className="flex items-center">
          {location !== 'search' && (
            <Link to="/search" className="mx-1 hover:cursor-pointer">
              <Search />
            </Link>
          )}

          <button
            type="button"
            className="mx-1 hover:cursor-pointer"
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
export default connect(null, { checkAuthenticated, load_user })(NavBar);
