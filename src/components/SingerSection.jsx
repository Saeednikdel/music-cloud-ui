import React from 'react';
import SingerCard from './SingerCard';
import data from '../data';
const SingerSection = () => {
  return (
    <div className="overflow-auto whitespace-nowrap p-4 space-x-4">
      {data.map((item) => (
        <SingerCard key={DataTransferItemList.title} item={item} />
      ))}
    </div>
  );
};

export default SingerSection;
