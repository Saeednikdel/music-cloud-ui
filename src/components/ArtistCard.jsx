import React from 'react';

const ArtistCard = ({ item }) => {
  return (
    <div className="inline-block hover:cursor-pointer">
      <div className="rounded-full border-4 border-slate-300 dark:border-slate-700 overflow-hidden shadow-lg w-20 h-20 block ">
        <img
          alt="artist"
          className=" h-full w-full object-cover"
          src={item.image}
        />
      </div>
    </div>
  );
};

export default ArtistCard;
