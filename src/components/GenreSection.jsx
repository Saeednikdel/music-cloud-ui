import React from 'react';
import GenreCard from './GenreCard';
import genres from '../genres';
const GenreSection = () => {
  return (
    <div className="overflow-auto whitespace-nowrap p-4 space-x-4">
      {genres.map((item, i) => (
        <GenreCard key={i} item={item} />
      ))}
    </div>
  );
};

export default GenreSection;
