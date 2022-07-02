import React from 'react';
import artists from '../artists';

const Favorites = () => {
  return (
    <div className="mb-24">
      {artists.map((item, i) => (
        <div
          key={i}
          className="flex py-2 px-6 text-xl font-semibold space-x-4 hover:cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700">
          <img
            alt={item.title}
            className="w-20 h-20 object-cover rounded-full"
            src={item.image}
          />
          <h2>{item.name}</h2>
        </div>
      ))}
    </div>
  );
};

export default Favorites;
