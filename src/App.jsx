import { useRef, useState, useEffect } from 'react';
import AppCarousel from './components/AppCarousel';
import Left from './components/LeftMenu';
import Right from './components/RightMenu';
import NavBar from './components/NavBar';
import NewsSection from './components/NewsSection';
import SingerSection from './components/SingerSection';
import SongSection from './components/SongSection';
import PlayerComponent from './Player/PlayerComponent';
import data from './data';
const App = () => {
  const [theme, setTheme] = useState('dark');
  const [index, setIndex] = useState(0);
  const [songs, setSongs] = useState(data);
  const [isplaying, setisplaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(data[0]);
  const audioElem = useRef();

  useEffect(() => {
    if (isplaying) {
      audioElem.current.play();
    } else {
      audioElem.current.pause();
    }
  }, [isplaying]);

  const onPlaying = () => {
    const duration = audioElem.current.duration;
    const ct = audioElem.current.currentTime;
    setCurrentSong({
      ...currentSong,
      progress: (ct / duration) * 100,
      length: duration,
      ct: ct,
    });
  };
  const skiptoNext = () => {
    const index = songs.findIndex((x) => x.title === currentSong.title);
    if (index === songs.length - 1) {
      setIndex(0);
      setCurrentSong(songs[0]);
    } else {
      setIndex(index + 1);
      setCurrentSong(songs[index + 1]);
    }
    audioElem.current.currentTime = 0;
    if (!isplaying) {
      setisplaying(true);
    }
  };
  const skipBack = () => {
    const index = songs.findIndex((x) => x.title === currentSong.title);
    if (index === 0) {
      setIndex(songs.length - 1);
      setCurrentSong(songs[songs.length - 1]);
    } else {
      setIndex(index - 1);
      setCurrentSong(songs[index - 1]);
    }
    audioElem.current.currentTime = 0;
    if (!isplaying) {
      setisplaying(true);
    }
  };
  const skip = (i) => {
    setIndex(i);
    setCurrentSong(songs[i]);
    audioElem.current.currentTime = 0;
    if (!isplaying) {
      setisplaying(true);
    }
  };
  const handleTheme = () => {
    if (theme === '') {
      setTheme('dark');
    } else {
      setTheme('');
    }
  };
  return (
    <div className={`min-h-screen px-auto ${theme}`}>
      <NavBar setTheme={handleTheme} checked={theme === 'dark'} />
      <div className="grid grid-cols-5">
        <div className="hidden md:block md:col-span-1">
          <Left />
        </div>

        <div className=" col-span-5 md:col-span-3 pt-14 pb-32 h-screen overflow-auto bg-gray-100 dark:bg-slate-800 text-gray-800 dark:text-gray-200">
          <AppCarousel />
          <NewsSection />
          <SingerSection />
          <SongSection skip={skip} />
        </div>
        <div className="hidden md:block  md:col-span-1">
          <Right index={index} skip={skip} />
        </div>
      </div>
      <div className="fixed top-auto bottom-0 z-50 w-full">
        <audio
          autoPlay
          src={currentSong.url}
          ref={audioElem}
          onTimeUpdate={onPlaying}
          onEnded={skiptoNext}
        />
        <PlayerComponent
          songs={songs}
          setSongs={setSongs}
          skipBack={skipBack}
          skiptoNext={skiptoNext}
          isplaying={isplaying}
          setisplaying={setisplaying}
          audioElem={audioElem}
          currentSong={currentSong}
          setCurrentSong={setCurrentSong}
        />
      </div>
    </div>
  );
};

export default App;
