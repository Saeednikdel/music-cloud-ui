import React from 'react';
import { Add, PlaylistPlay } from '@mui/icons-material';
const PlayLists = () => {
  const list = [
    'Recently added',
    'Recently played',
    'Most played',
    'Not played',
  ];
  return (
    <div className="mb-24 mt-4">
      <div className="flex py-2 px-6 text-xl font-semibold space-x-4 hover:cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700">
        <Add fontSize="large" />
        <h2>Create New PlayList</h2>
      </div>
      {list.map((item) => (
        <div className="flex py-2 px-6 text-xl font-semibold space-x-4 hover:cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700">
          <PlaylistPlay fontSize="large" />
          <h2>{item}</h2>
        </div>
      ))}
    </div>
  );
};

export default PlayLists;
