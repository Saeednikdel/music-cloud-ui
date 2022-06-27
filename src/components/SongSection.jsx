import React from 'react';
import SongCard from './SongCard';
import data from '../data';
const SongSection = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
      {data.map((item, i) => (
        <SongCard key={i} item={item} />
      ))}
    </div>
  );
};

export default SongSection;
