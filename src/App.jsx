import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { load_now_playing, load_post, set_now_playing } from './actions/cloud';
import { useEffect, useRef, useState } from 'react';

import Activate from './components/forms/Activate';
import CreateCard from './container/CreateCard';
import EditPost from './components/forms/EditPost';
import { Helmet } from 'react-helmet-async';
import LeftMenu from './components/LeftMenu';
import List from './container/List';
import Login from './components/forms/Login';
import NavBar from './components/NavBar';
import NewPost from './components/forms/NewPost';
import NowPlaying from './container/NowPlaying';
import OutsideClickHandler from 'react-outside-click-handler';
import PlayList from './container/PlayList';
import PlayLists from './container/PlayLists';
import PlayerFull from './Player/PlayerFull';
import PlayerSimple from './Player/PlayerSimple';
import Popup from './components/Popup';
import ProfileSetting from './container/ProfileSetting';
import PlayListAddDialog from './components/PlayListAddDialog';
import ResetPassword from './components/forms/ResetPassword';
import ResetPasswordConfirm from './components/forms/ResetPasswordConfirm';
import Signup from './components/forms/Signup';
import SongMenu from './components/SongMenu';
import SongSection from './components/SongSection';
import UserProfile from './container/UserProfile';
import { connect } from 'react-redux';

const App = ({
  post,
  now_playing,
  set_now_playing,
  load_post,
  now_playing_count,
  load_now_playing,
}) => {
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') ? localStorage.getItem('theme') : ''
  );
  const [openPopup, setOpenPopup] = useState(false);
  const [addToPlayListPopUp, setAddToPlayListPopUp] = useState(false);
  const [source, setSource] = useState({
    source: null,
    page: null,
    index: null,
    user_name: null,
    playlistid: null,
  });
  const [isplaying, setisplaying] = useState(false);
  const [isplayerOpen, setisplayerOpen] = useState(false);
  const [full, setfull] = useState(false);
  const [currentSong, setCurrentSong] = useState();
  const [menuItem, setMenuItem] = useState({
    source: null,
    id: null,
    user_name: null,
    playlistid: null,
  });
  const audioElem = useRef();
  useEffect(() => {
    if (isplaying) {
      audioElem.current.play();
      // updateNotif();
    } else {
      audioElem.current.pause();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isplaying]);
  const new_post_id = post && post.id;
  useEffect(() => {
    post && selectDontPlay(post);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [new_post_id]);
  useEffect(() => {
    !openPopup && setAddToPlayListPopUp(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openPopup]);
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
    if (full) {
      const duration = audioElem.current.duration;
      const ct = audioElem.current.currentTime;
      setCurrentSong({
        ...currentSong,
        progress: (ct / duration) * 100,
        length: duration,
        ct: ct,
      });
    }
  };
  const skiptoNext = () => {
    if (now_playing_count > 0 && source.index < now_playing_count - 1) {
      setSource({ ...source, index: source.index + 1 });
      load_post(now_playing[source.index + 1].id);
      if (
        source.index === now_playing.length - 2 &&
        now_playing.length < now_playing_count
      ) {
        load_now_playing(
          source.source,
          source.page,
          source.user_name,
          source.playlistid
        );
        setSource({ ...source, page: source.page + 1 });
      }
    }
  };
  const skipBack = () => {
    if (now_playing_count > 0 && source.index > 0) {
      setSource({ ...source, index: source.index - 1 });
      load_post(now_playing[source.index - 1].id);
    }
  };
  const skipToIndex = (i) => {
    setSource({ ...source, index: i });
    load_post(now_playing[i].id);
  };
  const skip = (source, page, index, user_name, playlistid) => {
    setSource({ source, page, index, user_name, playlistid });
    set_now_playing(source);
  };
  const selectDontPlay = (post) => {
    !isplayerOpen && setisplayerOpen(true);
    audioElem.current.currentTime = 0;
    setCurrentSong(post);
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
  const openMenu = (source, id, user_name, playlistid, url) => {
    setMenuItem({ source, id, user_name, playlistid, url });
    if (source === 'player') setAddToPlayListPopUp(true);
    setOpenPopup(true);
  };
  return (
    <BrowserRouter>
      <Helmet>
        <title>{isplaying ? post.title : 'Music Cluod'}</title>
      </Helmet>
      <div className={`min-h-screen px-auto ${theme}`}>
        <NavBar setTheme={handleTheme} checked={theme === 'dark'} />
        <audio
          preload="auto"
          autoPlay={isplayerOpen && isplaying}
          src={currentSong && currentSong.url}
          ref={audioElem}
          onTimeUpdate={onPlaying}
          onEnded={skiptoNext}
        />
        <div className="grid grid-cols-4 h-screen bg-gray-100 dark:bg-slate-800 text-gray-800 dark:text-gray-200">
          <div className="hidden md:block md:col-span-1 bg-white dark:bg-slate-900">
            <LeftMenu />
          </div>

          <div className=" col-span-4 md:col-span-3 pt-14 bg-gray-100 dark:bg-slate-800">
            <Routes>
              <Route
                exact
                path="/"
                element={<SongSection skip={skip} openMenu={openMenu} />}
              />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/signup" element={<Signup />} />
              <Route exact path="/reset_password" element={<ResetPassword />} />
              <Route exact path="/list/:type/:id" element={<List />} />

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
                element={
                  <NowPlaying
                    index={source.index}
                    skipToIndex={skipToIndex}
                    source={source}
                    setSource={setSource}
                  />
                }
              />
              <Route exact path="/createcard/:id" element={<CreateCard />} />
              <Route exact path="/edit/:id" element={<EditPost />} />
              <Route exact path="/new" element={<NewPost />} />
              <Route exact path="/playlists" element={<PlayLists />} />
              <Route
                exact
                path="/playlist/:id"
                element={<PlayList skip={skip} openMenu={openMenu} />}
              />
              <Route
                exact
                path="/u/:userName"
                element={<UserProfile skip={skip} openMenu={openMenu} />}
              />
              <Route exact path="/setting" element={<ProfileSetting />} />
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
                path="/p/:id"
                element={
                  <PlayerFull
                    skipBack={skipBack}
                    skiptoNext={skiptoNext}
                    setisplaying={setisplaying}
                    isplaying={isplaying}
                    audioElem={audioElem}
                    currentSong={currentSong}
                    setfull={setfull}
                    openMenu={openMenu}
                  />
                }
              />
            </Routes>
          </div>
        </div>
        {!full && isplayerOpen && (
          <div className="fixed top-auto bottom-0 z-50 w-full">
            <PlayerSimple
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
        <OutsideClickHandler
          disabled={!openPopup}
          onOutsideClick={() => setOpenPopup(!openPopup)}>
          <Popup title="" openPopup={openPopup} setOpenPopup={setOpenPopup}>
            {addToPlayListPopUp ? (
              <PlayListAddDialog
                menuItem={menuItem}
                setOpenPopup={setOpenPopup}
                setAddToPlayListPopUp={setAddToPlayListPopUp}
              />
            ) : (
              <SongMenu
                menuItem={menuItem}
                setOpenPopup={setOpenPopup}
                setAddToPlayListPopUp={setAddToPlayListPopUp}
              />
            )}
          </Popup>
        </OutsideClickHandler>
      </div>
    </BrowserRouter>
  );
};

const mapStateToProps = (state) => ({
  post: state.cloud.post,
  now_playing: state.cloud.now_playing,
  now_playing_count: state.cloud.now_playing_count,
});
export default connect(mapStateToProps, {
  load_now_playing,
  set_now_playing,
  load_post,
})(App);
