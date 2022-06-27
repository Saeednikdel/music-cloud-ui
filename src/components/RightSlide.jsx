import React from 'react';
import data from '../data';
import { QueueMusicOutlined } from '@mui/icons-material';
const RightSlide = ({ rightClass, openRightMenu, index, skip }) => {
  return (
    <div
      id="slider-right"
      className={`absolute md:hidden flex flex-col w-2/3 h-screen overflow-auto pb-40 mt-2 space-y-1 text-lg font-semibold right-0 bg-white dark:bg-slate-900 text-gray-800 dark:text-gray-200 ${rightClass}`}>
      <h1 className=" sticky pt-4 pb-4 px-2 bg-white dark:bg-slate-900 text-gray-800 dark:text-gray-200">
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
            className="w-10 h-10 object-cover"
            src={item.cover}
          />
          <div className={`text-xs px-2 ${i === index && 'text-blue-600'}`}>
            <h2>{item.title}</h2>
            <p>{item.singer}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RightSlide;
