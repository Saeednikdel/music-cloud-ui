import React from 'react';
import data from '../data';
import { Album } from '@mui/icons-material';

const Albums = () => {
  let list = data.map((item) => {
    return item.album;
  });
  const uniq = [...new Set(list)];

  return (
    <div className="mb-24 mt-2">
      {uniq.map((item, i) => (
        <div
          key={i}
          className="flex py-2 px-6 text-xl font-semibold space-x-4 hover:cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700">
          <Album fontSize="large" />
          <h2>{item}</h2>
        </div>
      ))}
    </div>
  );
};

export default Albums;
