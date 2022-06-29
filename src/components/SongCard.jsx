import React from 'react';

const SongCard = ({ item, skip, i }) => {
  return (
    <div onClick={() => skip(i)} className="inline-block hover:cursor-pointer">
      <div className=" bg-white dark:bg-slate-900 text-gray-800 dark:text-gray-200 shadow-lg rounded-lg overflow-hidden w-40 block mx-auto">
        <img
          alt="album art"
          className=" h-full w-full object-cover"
          src={item.artwork[0].src}
        />
        <div className=" py-1 px-2 h-20">
          <h1>{item.title}</h1>
          <h1>{item.artist}</h1>
        </div>
      </div>
    </div>
  );
};

export default SongCard;
