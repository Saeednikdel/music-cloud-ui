import React from 'react';
import UserSection from '../components/UserSection';
import SongSection from '../components/SongSection';
const Home = ({ skip, openMenu }) => {
  return (
    <>
      <UserSection /> <SongSection skip={skip} openMenu={openMenu} />
    </>
  );
};

export default Home;
