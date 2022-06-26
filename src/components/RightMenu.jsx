import React from 'react';
import data from '../data';
import { QueueMusicOutlined } from '@mui/icons-material';
const RightMenu = ({}) => {
  return (
    <div
      className={`flex flex-col h-screen overflow-auto pb-28 space-y-1 text-lg font-semibold bg-slate-900 text-gray-200`}>
      <h1 className=" sticky top-0 bg-slate-900  pt-16 pb-4 px-2">
        <QueueMusicOutlined />
        Now Playing
      </h1>
      {data.map((item) => (
        <a className="hover:bg-gray-700  flex hover:cursor-pointer px-2">
          <img className="w-10 h-10 object-cover" src={item.cover} />
          <div className=" text-xs px-2">
            <h2>{item.title}</h2>
            <p>{item.singer}</p>
          </div>
        </a>
      ))}
    </div>
  );
};

export default RightMenu;
