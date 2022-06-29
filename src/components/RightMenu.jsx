import React from 'react';
import data from '../data';
import { QueueMusicOutlined } from '@mui/icons-material';
const RightMenu = ({ index, skip }) => {
  return (
    <div
      className={`flex flex-col h-screen overflow-auto pb-28 space-y-1 text-lg font-semibold bg-white dark:bg-slate-900 text-gray-800 dark:text-gray-200`}>
      <h1 className=" sticky top-0 pt-16 pb-4 px-2 bg-white dark:bg-slate-900 text-gray-800 dark:text-gray-200">
        <QueueMusicOutlined className="mx-4" />
        Now Playing
      </h1>
      {data.map((item, i) => (
        <div
          onClick={() => skip(i)}
          key={i}
          className="hover:bg-gray-300 dark:hover:bg-gray-700  flex hover:cursor-pointer px-2">
          <img
            alt={item.title}
            className="w-16 h-16 object-cover"
            src={item.artwork[0].src}
          />
          <div className={`text-base px-2 ${i === index && 'text-blue-600'}`}>
            <h2>{item.title}</h2>
            <p>{item.artist}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RightMenu;
