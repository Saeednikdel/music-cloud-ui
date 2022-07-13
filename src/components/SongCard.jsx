import { Link } from 'react-router-dom';
import { MoreVert } from '@mui/icons-material';
import React from 'react';

const SongCard = ({
  post,
  skip,
  index,
  source,
  page,
  playlistid,
  userName,
  openMenu,
}) => {
  const click = () => {
    const user_name = userName ? userName : post.user_name;
    skip(source, page, index, user_name, playlistid);
  };
  return (
    <div className="bg-white dark:bg-slate-900 text-gray-800 dark:text-gray-200 shadow-lg rounded-lg overflow-hidden w-40 block mx-auto">
      <Link
        className="  hover:cursor-pointer"
        Link
        onClick={click}
        to={`/p/${post.id}`}>
        <img
          alt="album art"
          className=" h-40 w-40 object-cover"
          src={post.artwork}
        />
      </Link>
      <div className="flex justify-between py-1 items-center">
        <Link
          to={`/u/${post.user_name}`}
          className=" text-sm  px-2 text-gray-500 hover:cursor-pointer">
          @
          {post.user_name.length > 10
            ? post.user_name.slice(0, 10) + '...'
            : post.user_name}
        </Link>
        <MoreVert
          onClick={() => openMenu(source, post.id, post.user_name)}
          className="  hover:cursor-pointer"
        />
      </div>
      <div className=" py-1 px-2 h-20">
        <h1 className=" font-bold">
          {post.title.length > 15
            ? post.title.slice(0, 15) + '...'
            : post.title}
        </h1>
        <h1>
          {post.artist.length > 15
            ? post.artist.slice(0, 15) + '...'
            : post.artist}
        </h1>
      </div>
    </div>
  );
};
export default SongCard;
