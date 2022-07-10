import React from 'react';
import {
  Person,
  PlaylistPlay,
  Favorite,
  Home,
  QueueMusicOutlined,
  Login,
  Logout,
  Settings,
} from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import { logout } from '../actions/auth';
import { connect } from 'react-redux';

const LeftMenu = ({ isAuthenticated, logout, user }) => {
  const location = useLocation().pathname.split('/')[1];
  const activeClass = 'text-blue-600 bg-slate-300 dark:bg-gray-700';

  return (
    <div
      className={`flex flex-col h-screen pt-20 space-y-1 text-lg font-semibold bg-white dark:bg-slate-900 text-gray-800 dark:text-gray-200`}>
      <Link
        to="/"
        className={`hover:bg-gray-300 dark:hover:bg-gray-700 rounded-l-full flex px-1 py-2 hover:cursor-pointer ml-4 ${
          location === '' && activeClass
        }`}>
        <Home className="mx-4" />
        Home
      </Link>
      <Link
        to="/nowplaying"
        className={`hover:bg-gray-300 dark:hover:bg-gray-700 rounded-l-full flex px-1 py-2 hover:cursor-pointer ml-4 ${
          location === 'nowplaying' && activeClass
        }`}>
        <QueueMusicOutlined className="mx-4" />
        Now playing
      </Link>
      {isAuthenticated && user ? (
        <>
          <Link
            to={`/u/${user.name}`}
            className={`hover:bg-gray-300 dark:hover:bg-gray-700 rounded-l-full flex px-1 py-2 hover:cursor-pointer ml-4 ${
              location === 'u' && activeClass
            }`}>
            <Person className=" mx-4" />
            Profile
          </Link>
          <Link
            to="/playlists"
            className={`hover:bg-gray-300 dark:hover:bg-gray-700 rounded-l-full flex px-1 py-2 hover:cursor-pointer ml-4 ${
              location === 'playlists' && activeClass
            }`}>
            <PlaylistPlay className=" mx-4" />
            Playlists
          </Link>
          <Link
            to="/favorites"
            className={`hover:bg-gray-300 dark:hover:bg-gray-700 rounded-l-full flex px-1 py-2 hover:cursor-pointer ml-4 ${
              location === 'favorites' && activeClass
            }`}>
            <Favorite className=" mx-4" />
            Favorite
          </Link>
          <Link
            to="/setting"
            className={`hover:bg-gray-300 dark:hover:bg-gray-700 rounded-l-full flex px-1 py-2 hover:cursor-pointer ml-4 ${
              location === 'setting' && activeClass
            }`}>
            <Settings className=" mx-4" />
            Setting
          </Link>
          <p
            onClick={() => logout()}
            className="hover:bg-gray-300 dark:hover:bg-gray-700 rounded-l-full flex px-1 py-2 hover:cursor-pointer ml-4">
            <Logout className=" mx-4" />
            Log out
          </p>
        </>
      ) : (
        <Link
          to="/login"
          className={`hover:bg-gray-300 dark:hover:bg-gray-700 rounded-l-full flex px-1 py-2 hover:cursor-pointer ml-4 ${
            location === 'login' && activeClass
          }`}>
          <Login className=" mx-4" />
          Login
        </Link>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});
export default connect(mapStateToProps, { logout })(LeftMenu);
