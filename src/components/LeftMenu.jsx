import React from 'react';
import {
  Album,
  Person,
  PlaylistPlay,
  Favorite,
  MusicNote,
  Home,
  QueueMusicOutlined,
} from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
const LeftMenu = ({ setFullPlayer }) => {
  const location = useLocation().pathname.split('/')[1];
  const activeClass = 'text-blue-600 bg-slate-300 dark:bg-gray-700';
  const click = () => {
    setFullPlayer(false);
  };
  return (
    <div
      className={`flex flex-col h-screen pt-20 space-y-1 text-lg font-semibold bg-white dark:bg-slate-900 text-gray-800 dark:text-gray-200`}>
      <Link
        onClick={click}
        to="/"
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
      <Link
        onClick={click}
        to="/albums"
        className={`hover:bg-gray-300 dark:hover:bg-gray-700 rounded-l-full flex px-1 py-2 hover:cursor-pointer ml-4 ${
          location === 'albums' && activeClass
        }`}>
        <Album className="mx-4" />
        Album
      </Link>
      <Link
        onClick={click}
        to="/artists"
        className={`hover:bg-gray-300 dark:hover:bg-gray-700 rounded-l-full flex px-1 py-2 hover:cursor-pointer ml-4 ${
          location === 'artists' && activeClass
        }`}>
        <Person className=" mx-4" />
        Artists
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
        to="/genres"
        className={`hover:bg-gray-300 dark:hover:bg-gray-700 rounded-l-full flex px-1 py-2 hover:cursor-pointer ml-4 ${
          location === 'genres' && activeClass
        }`}>
        <MusicNote className=" mx-4" />
        Genre
      </Link>
    </div>
  );
};

export default LeftMenu;
