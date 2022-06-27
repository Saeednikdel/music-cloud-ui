import React, { useState } from 'react';
import Player from './Player/Player';
import AppCarousel from './components/AppCarousel';
import Left from './components/LeftMenu';
import Right from './components/RightMenu';
import NavBar from './components/NavBar';
import NewsSection from './components/NewsSection';
import SingerSection from './components/SingerSection';
import SongSection from './components/SongSection';
const App = () => {
  const [theme, setTheme] = useState('dark');
  const handleTheme = () => {
    if (theme == '') {
      setTheme('dark');
    } else {
      setTheme('');
    }
  };
  return (
    <div className={`min-h-screen px-auto ${theme}`}>
      <NavBar setTheme={handleTheme} checked={theme == 'dark'} />
      <div className="grid grid-cols-5">
        <div className="hidden md:block md:col-span-1">
          <Left />
        </div>

        <div className=" col-span-5 md:col-span-3 pt-14 pb-32 h-screen overflow-auto bg-gray-100 dark:bg-slate-800 text-gray-800 dark:text-gray-200">
          <AppCarousel />
          <NewsSection />
          <SingerSection />
          <SongSection />
        </div>
        <div className="hidden md:block  md:col-span-1">
          <Right />
        </div>
      </div>
      <Player />
    </div>
  );
};

export default App;
