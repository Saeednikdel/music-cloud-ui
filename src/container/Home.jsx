import React from 'react';
// import AppCarousel from '../components/AppCarousel';
import GenreSection from '../components/GenreSection';
import ArtistSection from '../components/ArtistSection';
import SongSection from '../components/SongSection';
const Home = ({ skip }) => {
  return (
    <>
      {/* <AppCarousel /> */}
      <GenreSection />
      <ArtistSection />
      <SongSection skip={skip} />
    </>
  );
};

export default Home;
