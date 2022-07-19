import {
  Add,
  Home,
  Login,
  Logout,
  Person,
  QueueMusicOutlined,
  Settings,
  NotificationsNone,
  Language,
} from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import translate from '../translate';

import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';

const LeftSlide = ({
  openLeftMenu,
  setOpenLeftMenu,
  isAuthenticated,
  logout,
  user,
  openMenu,
}) => {
  const location = useLocation().pathname.split('/')[1];
  const activeClass = ' text-blue-600 ';
  const click = () => {
    setOpenLeftMenu(false);
  };
  const handlelang = () => {
    setOpenLeftMenu(false);
    openMenu('lang');
  };
  return (
    <div
      className={`absolute -mt-1.5 md:hidden flex flex-col w-2/3 h-screen pt-6 space-y-1 text-lg font-semibold top-14 left-0 rtl:right-0 bg-white dark:bg-slate-900 text-gray-800 dark:text-gray-200 transition ease-in-out duration-500 ${
        openLeftMenu ? '' : '-translate-x-full rtl:translate-x-full'
      }`}>
      <Link
        to="/"
        onClick={click}
        className={`flex px-1 py-2 hover:cursor-pointer mx-4 ${
          location === '' && activeClass
        }`}>
        <Home className="mx-4" />
        {translate('Home')}
      </Link>
      <Link
        onClick={click}
        to="/nowplaying"
        className={`flex px-1 py-2 hover:cursor-pointer mx-4 ${
          location === 'nowplaying' && activeClass
        }`}>
        <QueueMusicOutlined className="mx-4" />
        {translate('Now playing')}
      </Link>
      {isAuthenticated && user ? (
        <>
          <Link
            onClick={click}
            to={`/u/${user.name}`}
            className={`flex px-1 py-2 hover:cursor-pointer mx-4 ${
              location === 'u' && activeClass
            }`}>
            <Person className=" mx-4" />
            {translate('Profile')}
          </Link>
          {/* <Link
            onClick={click}
            to="/playlists"
            className={`flex px-1 py-2 hover:cursor-pointer mx-4 ${
              location === 'playlists' && activeClass
            }`}>
            <PlaylistPlay className=" mx-4" />
            Playlists
          </Link> */}
          {/* <Link
            onClick={click}
            to="/favorites"
            className={`flex px-1 py-2 hover:cursor-pointer mx-4 ${
              location === 'favorites' && activeClass
            }`}>
            <Favorite className=" mx-4" />
            Favorite
          </Link> */}
          <Link
            onClick={click}
            to="/new"
            className={`flex px-1 py-2 hover:cursor-pointer mx-4 ${
              location === 'new' && activeClass
            }`}>
            <Add className=" mx-4" />
            {translate('New Post')}
          </Link>
          <Link
            onClick={click}
            to="/notification"
            className={`flex px-1 py-2 hover:cursor-pointer mx-4 ${
              location === 'notification' && activeClass
            }`}>
            <NotificationsNone className=" mx-4" />
            {translate('Notification')}
          </Link>
          <Link
            onClick={click}
            to="/setting"
            className={`flex px-1 py-2 hover:cursor-pointer mx-4 ${
              location === 'setting' && activeClass
            }`}>
            <Settings className=" mx-4" />
            {translate('Setting')}
          </Link>
          {/* <p
            onClick={() => logout()}
            className="flex px-1 py-2 hover:cursor-pointer mx-4">
            <Logout className=" mx-4" />
            Log out
          </p> */}
        </>
      ) : (
        <Link
          onClick={click}
          to="/login"
          className={`flex px-1 py-2 hover:cursor-pointer mx-4 ${
            location === 'login' && activeClass
          }`}>
          <Login className=" mx-4" />
          {translate('Login')}
        </Link>
      )}
      <button
        onClick={handlelang}
        className="flex px-1 py-2 hover:cursor-pointer mx-4">
        <Language className=" mx-4" />
        {translate('Change language')}
      </button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});
export default connect(mapStateToProps, { logout })(LeftSlide);
