import React from 'react';

const GenreCard = ({ item }) => {
  return (
    <div className="inline-block hover:cursor-pointer shadow-lg">
      <div className="rounded-lg overflow-hidden text-white w-40 h-44 block">
        <img
          alt="album art"
          className=" h-full w-full object-cover"
          src={item.image}
        />
        <div className=" backdrop-blur-md -mt-10 py-2 px-4 capitalize font-bold">
          <h1>{item.title}</h1>
        </div>
      </div>
    </div>
  );
};

export default GenreCard;
