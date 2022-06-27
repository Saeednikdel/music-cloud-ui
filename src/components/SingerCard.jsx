import React from 'react';

const SingerCard = ({ item }) => {
  return (
    <div className="inline-block ">
      <div className="rounded-full border-4 border-blue-600 overflow-hidden shadow-lg w-16 h-16 block ">
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
