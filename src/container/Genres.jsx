import React from 'react';
import genres from '../genres';
const Genres = () => {
  return (
    <div className="mb-24">
      {genres.map((item, i) => (
        <div
          key={i}
          className="flex py-2 px-6 text-xl font-semibold space-x-4 hover:cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700">
          <img
            alt={item.title}
            className=" h-20 w-20 object-cover rounded-lg"
            src={item.image}
          />
          <h1>{item.title}</h1>
        </div>
      ))}
    </div>
  );
};

export default Genres;
