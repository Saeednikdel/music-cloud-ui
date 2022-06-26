import React from 'react';
import SingerCard from './SingerCard';
import singers from '../singers';
const SingerSection = () => {
  return (
    <div className="overflow-auto whitespace-nowrap p-2 space-x-4">
      {singers.map((item, i) => (
        <SingerCard key={i} item={item} />
      ))}
    </div>
  );
};

export default SingerSection;
