import { useRef, useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LeftMenu from './components/LeftMenu';
import NowPlaying from './container/NowPlaying';
import NavBar from './components/NavBar';
import Home from './container/Home';
import PlayLists from './container/PlayLists';
import Artists from './container/Artists';
import Albums from './container/Albums';
import Favorites from './container/Favorites';
import Genres from './container/Genres';
import PlayerSimple from './Player/PlayerSimple';
import PlayerFull from './Player/PlayerFull';
import New from './container/New';
import CreateCard from './container/CreateCard';
import { Provider } from 'react-redux';
import store from './store';
import data from './data';
import Login from './components/forms/Login';
import Signup from './components/forms/Signup';
import ResetPassword from './components/forms/ResetPassword';
import ResetPasswordConfirm from './components/forms/ResetPasswordConfirm';
import Activate from './components/forms/Activate';

const App = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') ? localStorage.getItem('theme') : ''
  );
  const [index, setIndex] = useState();
  const [isplaying, setisplaying] = useState(false);
  const [isplayerOpen, setisplayerOpen] = useState(false);
  const [full, setfull] = useState(false);
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
    const index = data.findIndex((x) => x.title === currentSong.title);
    if (index === data.length - 1) {
      setIndex(0);
      setCurrentSong(data[0]);
      updateNotif(0);
    } else {
      setIndex(index + 1);
      setCurrentSong(data[index + 1]);
      updateNotif(index + 1);
    }
    audioElem.current.currentTime = 0;
    if (!isplaying) {
      setisplaying(true);
    }
  };
  const skipBack = () => {
    const index = data.findIndex((x) => x.title === currentSong.title);
    if (index === 0) {
      setIndex(data.length - 1);
      setCurrentSong(data[data.length - 1]);
      updateNotif(data.length - 1);
    } else {
      setIndex(index - 1);
      setCurrentSong(data[index - 1]);
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
    } else {
      setIndex(i);
      setCurrentSong(data[i]);
      audioElem.current.currentTime = 0;
      updateNotif(i);
    }
    if (!isplaying) {
      setisplaying(true);
    }
  };
  const selectDontPlay = (i) => {
    !isplayerOpen && setisplayerOpen(true);
    setIndex(i);
    setCurrentSong(data[i]);
  };
  const handleTheme = () => {
    if (theme === '') {
      setTheme('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      setTheme('');
      localStorage.setItem('theme', '');
    }
  };
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className={`min-h-screen px-auto ${theme}`}>
          <NavBar
            setTheme={handleTheme}
            checked={theme === 'dark'}
            index={index}
            skip={skip}
          />
          <audio
            preload="auto"
            autoPlay={isplayerOpen && isplaying}
            src={currentSong && currentSong.url}
            ref={audioElem}
            onTimeUpdate={onPlaying}
            onEnded={skiptoNext}
          />
          <div className="grid grid-cols-4">
            <div className="hidden md:block md:col-span-1">
              <LeftMenu />
            </div>

            <div className=" col-span-4 md:col-span-3 pt-14 h-screen overflow-auto bg-gray-100 dark:bg-slate-800 text-gray-800 dark:text-gray-200">
              <Routes>
                <Route exact path="/" element={<Home skip={skip} />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/signup" element={<Signup />} />
                <Route
                  exact
                  path="/reset_password"
                  element={<ResetPassword />}
                />
                <Route
                  exact
                  path="/password/reset/confirm/:uid/:token"
                  element={<ResetPasswordConfirm />}
                />
                <Route
                  exact
                  path="/activate/:uid/:token"
                  element={<Activate />}
                />
                <Route
                  exact
                  path="/nowplaying"
                  element={<NowPlaying index={index} skip={skip} />}
                />
                <Route exact path="/albums" element={<Albums />} />
                <Route exact path="/createcard/:id" element={<CreateCard />} />
                <Route exact path="/new" element={<New />} />
                <Route exact path="/artists" element={<Artists />} />
                <Route exact path="/playlists" element={<PlayLists />} />
                <Route
                  exact
                  path="/favorites"
                  element={<Favorites index={index} skip={skip} />}
                />
                <Route exact path="/genres" element={<Genres />} />
                <Route
                  exact
                  path="*"
                  element={
                    <h1 className=" text-center mt-20 text-3xl">
                      Page Not Found. 404
                    </h1>
                  }
                />
                <Route
                  exact
                  path="/player/:id"
                  element={
                    <PlayerFull
                      selectDontPlay={selectDontPlay}
                      index={index}
                      skipBack={skipBack}
                      skiptoNext={skiptoNext}
                      setisplaying={setisplaying}
                      isplaying={isplaying}
                      audioElem={audioElem}
                      currentSong={currentSong}
                      setfull={setfull}
                    />
                  }
                />
              </Routes>
            </div>
          </div>
          {!full && isplayerOpen && (
            <div className="fixed top-auto bottom-0 z-50 w-full">
              <PlayerSimple
                index={index}
                skipBack={skipBack}
                skiptoNext={skiptoNext}
                isplaying={isplaying}
                setisplaying={setisplaying}
                audioElem={audioElem}
                currentSong={currentSong}
                setCurrentSong={setCurrentSong}
              />
            </div>
          )}
        </div>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
