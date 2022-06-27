import React from 'react';

const SingerCard = ({ item }) => {
  return (
    <div className="inline-block hover:cursor-pointer">
      <div className="rounded-full border-4 border-blue-600 overflow-hidden shadow-lg w-20 h-20 block ">
        <img
          alt="singer"
          className=" h-full w-full object-cover"
          src={item.image}
        />
      </div>
    </div>
  );
};

export default SingerCard;
