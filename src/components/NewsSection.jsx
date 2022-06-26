import React from 'react';
import NewCard from './NewCard';
import data from '../data';
const NewsSection = () => {
  return (
    <div className="overflow-auto whitespace-nowrap p-4 space-x-4">
      {data.map((item) => (
        <NewCard key={DataTransferItemList.title} item={item} />
      ))}
    </div>
  );
};

export default NewsSection;
