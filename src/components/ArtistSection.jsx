import React from 'react';
import ArtistCard from './ArtistCard';
import artists from '../artists';
const ArtistSection = () => {
  return (
    <div className="overflow-auto whitespace-nowrap px-4 py-1 space-x-4">
      {artists.map((item, i) => (
        <ArtistCard key={i} item={item} />
      ))}
    </div>
  );
};

export default ArtistSection;
