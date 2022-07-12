import React from 'react';
import { Link } from 'react-router-dom';
const SongCard = ({ post, skip, index, source, page }) => {
  const click = () => {
    skip(source, page, index, post.user_name);
  };
  return (
    <div className=" bg-white dark:bg-slate-900 text-gray-800 dark:text-gray-200 shadow-lg rounded-lg overflow-hidden w-40 block mx-auto  hover:cursor-pointer">
      <Link Link onClick={click} to={`/p/${post.id}`}>
        <img
          alt="album art"
          className=" h-40 w-40 object-cover"
          src={post.artwork}
        />
      </Link>
      <div className=" py-1 px-2 h-20">
        <h1>{post.title}</h1>
        <h1>{post.artist}</h1>
      </div>
    </div>
  );
};

export default SongCard;
