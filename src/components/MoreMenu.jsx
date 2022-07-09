import React from 'react';
import {
  Share,
  Report,
  Add,
  Download,
  LibraryMusic,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
const MoreMenu = ({ showMore, currentSong, index }) => {
  return (
    <div
      className={`${
        showMore ? 'block' : 'hidden'
      } absolute bg-white dark:bg-slate-900 border bottom-8 right-0 border-gray-300 dark:border-gray-600 mb-2 p-2 rounded-lg z-10 shadow-lg w-60 space-y-1 translate-x-52`}>
      <div
        onClick={() =>
          navigator.share({
            title: 'Music Cloud',
            text: 'Music Cloud',
            url: `${process.env.REACT_APP_API_URL}/p/${index}`,
          })
        }
        className="flex px-2 py-1 space-x-2 items-center hover:cursor-pointer active:text-blue-600">
        <Share />
        <h1 className="text-xl">Share</h1>
      </div>
      <Link to={`/createcard/${index}/`}>
        <div className="flex px-2 py-1 space-x-2 items-center hover:cursor-pointer active:text-blue-600">
          <LibraryMusic />
          <h1 className="text-xl">Lyrics card</h1>
        </div>
      </Link>
      <a href={currentSong.url} download={currentSong.title + '[Music Cloud]'}>
        <div className="flex px-2 py-1 space-x-2 items-center hover:cursor-pointer active:text-blue-600">
          <Download />
          <h1 className="text-xl">Download</h1>
        </div>
      </a>
      <div className="flex px-2 py-1 space-x-2 items-center hover:cursor-pointer active:text-blue-600">
        <Add />
        <h1 className="text-xl">Add to playlist</h1>
      </div>
      <div className="flex px-2 py-1 space-x-2 items-center hover:cursor-pointer active:text-blue-600">
        <Report />
        <h1 className="text-xl">Report</h1>
      </div>
    </div>
  );
};

export default MoreMenu;
