import React from 'react';
import { Album, Person, List, Favorite, MusicNote } from '@mui/icons-material';

const LeftMenu = ({}) => {
  return (
    <div
      className={`flex flex-col h-screen pt-20 space-y-1 text-lg font-semibold bg-white dark:bg-slate-900 text-gray-800 dark:text-gray-200`}>
      <a className="hover:bg-gray-300 dark:hover:bg-gray-700 rounded-l-full flex px-1 py-2 hover:cursor-pointer ml-4">
        <Album className="mx-4" />
        Album
      </a>
      <a className="hover:bg-gray-300 dark:hover:bg-gray-700 text-blue-600 bg-slate-300 dark:bg-gray-700 rounded-l-full flex px-1 py-2 hover:cursor-pointer ml-4">
        <Person className=" mx-4" />
        Artists
      </a>
      <a className="hover:bg-gray-300 dark:hover:bg-gray-700  rounded-l-full flex px-1 py-2 hover:cursor-pointer ml-4">
        <List className=" mx-4" />
        Playlists
      </a>
      <a className="hover:bg-gray-300 dark:hover:bg-gray-700  rounded-l-full flex px-1 py-2 hover:cursor-pointer ml-4">
        <Favorite className=" mx-4" />
        Favorite
      </a>
      <a className="hover:bg-gray-300 dark:hover:bg-gray-700  rounded-l-full flex px-1 py-2 hover:cursor-pointer ml-4">
        <MusicNote className=" mx-4" />
        Genre
      </a>
    </div>
  );
};

export default LeftMenu;
