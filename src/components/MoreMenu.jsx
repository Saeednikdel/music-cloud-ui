import React from 'react';
import { Share, Report, FavoriteBorder, Add } from '@mui/icons-material';
const MoreMenu = ({ showMore }) => {
  return (
    <div
      className={`${
        showMore ? 'block' : 'hidden'
      } absolute bg-white dark:bg-slate-900 border bottom-8 right-0 border-gray-300 dark:border-gray-600 mb-2 p-2 rounded-lg z-10 shadow-lg w-60 space-y-1`}>
      <div
        onClick={() =>
          navigator.share({
            title: 'Music Cloud',
            text: 'Music Cloud',
            url: 'https://music-cloud-ui.vercel.app/',
          })
        }
        className="flex px-2 py-1 space-x-2 items-center hover:cursor-pointer">
        <Share />
        <h1 className="text-xl">Share</h1>
      </div>
      <div className="flex px-2 py-1 space-x-2 items-center hover:cursor-pointer">
        <Report />
        <h1 className="text-xl">Report</h1>
      </div>
      <div className="flex px-2 py-1 space-x-2 items-center hover:cursor-pointer">
        <FavoriteBorder />
        <h1 className="text-xl">Favorite</h1>
      </div>
      <div className="flex px-2 py-1 space-x-2 items-center hover:cursor-pointer">
        <Add />
        <h1 className="text-xl">Add to playlist</h1>
      </div>
    </div>
  );
};

export default MoreMenu;
