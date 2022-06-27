import React from 'react';
import data from '../data';
import { QueueMusicOutlined } from '@mui/icons-material';
const RightMenu = ({}) => {
  return (
    <div
      className={`flex flex-col h-screen overflow-auto pb-28 space-y-1 text-lg font-semibold bg-white dark:bg-slate-900 text-gray-800 dark:text-gray-200`}>
      <h1 className=" sticky top-0 pt-16 pb-4 px-2 bg-white dark:bg-slate-900 text-gray-800 dark:text-gray-200">
        <QueueMusicOutlined className="mx-4" />
        Now Playing
      </h1>
      {data.map((item, i) => (
        <a className="hover:bg-gray-300 dark:hover:bg-gray-700  flex hover:cursor-pointer px-2">
          <img className="w-10 h-10 object-cover" src={item.cover} />
          <div className={`text-xs px-2 ${i == 1 && 'text-blue-600'}`}>
            <h2>{item.title}</h2>
            <p>{item.singer}</p>
          </div>
        </a>
      ))}
    </div>
  );
};

export default RightMenu;
