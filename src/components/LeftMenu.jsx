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

const LeftMenu = ({ isAuthenticated, logout, user, openMenu }) => {
  const location = useLocation().pathname.split('/')[1];
  const activeClass = ' text-blue-600 ';

  return (
    <div
      className={`flex flex-col h-screen pt-20 space-y-1 text-lg font-semibold text-gray-800 dark:text-gray-200 fixed ltr:left-0 rtl:right-0`}>
      <Link
        to="/"
        className={`flex px-1 py-2 hover:cursor-pointer mx-4 ${
          location === '' && activeClass
        }`}>
        <Home className="mx-4" />
        {translate('Home')}
      </Link>
      <Link
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
            to={`/u/${user.name}`}
            className={`flex px-1 py-2 hover:cursor-pointer mx-4 ${
              location === 'u' && activeClass
            }`}>
            <Person className=" mx-4" />
            {translate('Profile')}
          </Link>
          {/* <Link
            to="/playlists"
            className={`flex px-1 py-2 hover:cursor-pointer mx-4 ${
              location === 'playlists' && activeClass
            }`}>
            <PlaylistPlay className=" mx-4" />
            Playlists
          </Link> */}
          {/* <Link
            to="/favorites"
            className={`flex px-1 py-2 hover:cursor-pointer mx-4 ${
              location === 'favorites' && activeClass
            }`}>
            <Favorite className=" mx-4" />
            Favorite
          </Link> */}
          <Link
            to="/new"
            className={`flex px-1 py-2 hover:cursor-pointer mx-4 ${
              location === 'new' && activeClass
            }`}>
            <Add className=" mx-4" />
            {translate('New Post')}
          </Link>
          <Link
            to="/notification"
            className={`flex px-1 py-2 hover:cursor-pointer mx-4 ${
              location === 'notification' && activeClass
            }`}>
            <NotificationsNone className=" mx-4" />
            {translate('Notification')}
          </Link>
          <Link
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
          to="/login"
          className={`flex px-1 py-2 hover:cursor-pointer mx-4 ${
            location === 'login' && activeClass
          }`}>
          <Login className=" mx-4" />
          {translate('Login')}
        </Link>
      )}
      <button
        onClick={() => openMenu('lang')}
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
export default connect(mapStateToProps, { logout })(LeftMenu);
