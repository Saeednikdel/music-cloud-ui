import React from 'react';
import data from '../data';

const Favorites = ({ index, skip }) => {
  return (
    <div className="mb-24">
      {data.slice(0, 4).map((item, i) => (
        <div
          onClick={() => skip(i)}
          key={i}
          className="flex py-2 px-6 text-xl font-semibold space-x-4 hover:cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700">
          <img
            alt={item.title}
            className="w-20 h-20 object-cover rounded-lg"
            src={item.artwork[0].src}
          />
          <div className={`${i === index && 'text-blue-600'}`}>
            <h2>{item.title}</h2>
            <p>{item.artist}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Favorites;