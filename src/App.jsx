import { useRef, useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LeftMenu from './components/LeftMenu';
import NowPlaying from './components/NowPlaying';
import NavBar from './components/NavBar';
import Home from './container/Home';
import PlayLists from './container/PlayLists';
import Artists from './container/Artists';
import Albums from './container/Albums';
import Favorites from './container/Favorites';
import Genres from './container/Genres';
import PlayerSimple from './Player/PlayerSimple';
import PlayerFull from './Player/PlayerFull';

import data from './data';
const App = () => {
  const [theme, setTheme] = useState('dark');
  const [index, setIndex] = useState();
  const [songs, setSongs] = useState(data);
  const [fullPlayer, setFullPlayer] = useState(false);
  const [isplaying, setisplaying] = useState(false);
  const [isplayerOpen, setisplayerOpen] = useState(false);
  const [currentSong, setCurrentSong] = useState();
  const audioElem = useRef();

  useEffect(() => {
    if (isplaying) {
      audioElem.current.play();
      updateNotif();
    } else {
      audioElem.current.pause();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isplaying]);

  const updateNotif = (i = index) => {
    if ('mediaSession' in navigator && isplaying) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: data[i].title,
        artist: data[i].artist,
        album: data[i].album,
        artwork: data[i].artwork,
      });
    }
  };
  navigator.mediaSession.setActionHandler('previoustrack', function () {
    skipBack();
  });

  navigator.mediaSession.setActionHandler('nexttrack', function () {
    skiptoNext();
  });
  navigator.mediaSession.setActionHandler('play', async function () {
    setisplaying(true);
  });
  navigator.mediaSession.setActionHandler('pause', function () {
    setisplaying(false);
  });
  navigator.mediaSession.setActionHandler('stop', function () {
    audioElem.current.pause();
    audioElem.current.currentTime = 0;
    setisplaying(false);
  });

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
      updateNotif(0);
    } else {
      setIndex(index + 1);
      setCurrentSong(songs[index + 1]);
      updateNotif(index + 1);
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
      updateNotif(songs.length - 1);
    } else {
      setIndex(index - 1);
      setCurrentSong(songs[index - 1]);
      updateNotif(index - 1);
    }
    audioElem.current.currentTime = 0;
    if (!isplaying) {
      setisplaying(true);
    }
  };
  const skip = (i) => {
    !isplayerOpen && setisplayerOpen(true);
    if (index === i) {
      setFullPlayer(true);
    } else {
      setIndex(i);
      setCurrentSong(songs[i]);
      audioElem.current.currentTime = 0;
      updateNotif(i);
    }
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
    <BrowserRouter>
      <div className={`min-h-screen px-auto ${theme}`}>
        <NavBar
          setFullPlayer={setFullPlayer}
          fullPlayer={fullPlayer}
          setTheme={handleTheme}
          checked={theme === 'dark'}
          index={index}
          skip={skip}
        />
        <audio
          preload="auto"
          autoPlay={isplayerOpen}
          src={currentSong && currentSong.url}
          ref={audioElem}
          onTimeUpdate={onPlaying}
          onEnded={skiptoNext}
        />
        <div className="grid grid-cols-4">
          <div className="hidden md:block md:col-span-1">
            <LeftMenu setFullPlayer={setFullPlayer} />
          </div>

          <div className=" col-span-4 md:col-span-3 pt-14 h-screen overflow-auto bg-gray-100 dark:bg-slate-800 text-gray-800 dark:text-gray-200">
            {fullPlayer ? (
              <PlayerFull
                songs={songs}
                setSongs={setSongs}
                skipBack={skipBack}
                skiptoNext={skiptoNext}
                setisplaying={setisplaying}
                isplaying={isplaying}
                audioElem={audioElem}
                currentSong={currentSong}
                setCurrentSong={setCurrentSong}
              />
            ) : (
              <Routes>
                <Route exact path="/" element={<Home skip={skip} />} />
                <Route
                  exact
                  path="/nowplaying"
                  element={<NowPlaying index={index} skip={skip} />}
                />
                <Route exact path="/albums" element={<Albums />} />
                <Route exact path="/artists" element={<Artists />} />
                <Route exact path="/playlists" element={<PlayLists />} />
                <Route
                  exact
                  path="/favorites"
                  element={<Favorites index={index} skip={skip} />}
                />
                <Route exact path="/genres" element={<Genres />} />
              </Routes>
            )}
          </div>
        </div>
        {!fullPlayer && isplayerOpen && (
          <div className="fixed top-auto bottom-0 z-50 w-full">
            <PlayerSimple
              songs={songs}
              setSongs={setSongs}
              skipBack={skipBack}
              skiptoNext={skiptoNext}
              isplaying={isplaying}
              setisplaying={setisplaying}
              audioElem={audioElem}
              currentSong={currentSong}
              setCurrentSong={setCurrentSong}
              setFullPlayer={setFullPlayer}
            />
          </div>
        )}
      </div>
    </BrowserRouter>
  );
};

export default App;
