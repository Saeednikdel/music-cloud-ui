import React from 'react';
import UserSection from '../components/UserSection';
import SongSection from '../components/SongSection';
import GenreSection from '../components/GenreSection';
const Home = ({ skip, openMenu }) => {
  return (
    <>
      <GenreSection />
      <UserSection /> <SongSection skip={skip} openMenu={openMenu} />
    </>
  );
};

export default Home;
