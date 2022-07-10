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

const LeftSlide = ({
  openLeftMenu,
  setOpenLeftMenu,
  isAuthenticated,
  logout,
  user,
}) => {
  const location = useLocation().pathname.split('/')[1];
  const activeClass = 'text-blue-600 bg-slate-300 dark:bg-gray-700';
  const click = () => {
    setOpenLeftMenu(false);
  };
  return (
    <div
      className={`absolute md:hidden flex flex-col w-2/3 h-screen pt-6 space-y-1 text-lg font-semibold top-14 left-0 bg-white dark:bg-slate-900 text-gray-800 dark:text-gray-200 transition ease-in-out duration-500 ${
        openLeftMenu ? '' : '-translate-x-full'
      }`}>
      <Link
        to="/"
        onClick={click}
        className={`hover:bg-gray-300 dark:hover:bg-gray-700 rounded-l-full flex px-1 py-2 hover:cursor-pointer ml-4 ${
          location === '' && activeClass
        }`}>
        <Home className="mx-4" />
        Home
      </Link>
      <Link
        onClick={click}
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
            onClick={click}
            to={`/u/${user.name}`}
            className={`hover:bg-gray-300 dark:hover:bg-gray-700 rounded-l-full flex px-1 py-2 hover:cursor-pointer ml-4 ${
              location === 'u' && activeClass
            }`}>
            <Person className=" mx-4" />
            Profile
          </Link>
          <Link
            onClick={click}
            to="/playlists"
            className={`hover:bg-gray-300 dark:hover:bg-gray-700 rounded-l-full flex px-1 py-2 hover:cursor-pointer ml-4 ${
              location === 'playlists' && activeClass
            }`}>
            <PlaylistPlay className=" mx-4" />
            Playlists
          </Link>
          <Link
            onClick={click}
            to="/favorites"
            className={`hover:bg-gray-300 dark:hover:bg-gray-700 rounded-l-full flex px-1 py-2 hover:cursor-pointer ml-4 ${
              location === 'favorites' && activeClass
            }`}>
            <Favorite className=" mx-4" />
            Favorite
          </Link>
          <Link
            onClick={click}
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
          onClick={click}
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
export default connect(mapStateToProps, { logout })(LeftSlide);
