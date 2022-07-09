import React from 'react';

const SongCard = ({ post, skip }) => {
  return (
    <div className="inline-block">
      <div
        onClick={() => skip(post.id)}
        className=" bg-white dark:bg-slate-900 text-gray-800 dark:text-gray-200 shadow-lg rounded-lg overflow-hidden w-40 block mx-auto  hover:cursor-pointer">
        <img
          alt="album art"
          className=" h-full w-full object-cover"
          src={post.artwork}
        />
        <div className=" py-1 px-2 h-20">
          <h1>{post.title}</h1>
          <h1>{post.artist}</h1>
        </div>
      </div>
    </div>
  );
};

export default SongCard;
