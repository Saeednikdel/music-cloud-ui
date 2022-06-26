import React from 'react';

const NewCard = ({ item }) => {
  return (
    <div className="inline-block ">
      <div className=" bg-slate-900 rounded-lg overflow-hidden text-white w-40 h-44 block ">
        <img
          alt="album art"
          className=" h-full w-full object-cover"
          src={item.cover}
        />
        <div className=" backdrop-blur-md -mt-14 py-1 px-2">
          <h1>{item.title}</h1>
          <h1>{item.singer}</h1>
        </div>
      </div>
    </div>
  );
};

export default NewCard;
