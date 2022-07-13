import React, { useState, useEffect } from 'react';
import {
  PlayArrow,
  Pause,
  SkipNext,
  SkipPrevious,
  VolumeOff,
  VolumeUp,
  MoreVert,
  FavoriteBorder,
  Favorite,
} from '@mui/icons-material';
import OutsideClickHandler from 'react-outside-click-handler';
import VolumePopUp from '../components/VolumePopUp';
import MoreMenu from '../components/MoreMenu';
import { useParams, Link } from 'react-router-dom';
import { load_post, favorite, load_likes } from '../actions/cloud';
import { connect } from 'react-redux';
import Popup from '../components/Popup';

const PlayerFull = ({
  audioElem,
  isplaying,
  setisplaying,
  currentSong,
  skipBack,
  skiptoNext,
  setfull,
  load_post,
  favorite,
  load_likes,
  now_playing_count,
  isAuthenticated,
  post,
}) => {
  const { id } = useParams();
  const [openPopup, setOpenPopup] = useState(false);
  const [flip, setFlip] = useState('');
  const [showVolume, setShowVolume] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [isMuted, setIsMuted] = useState(
    audioElem.current && audioElem.current.muted
  );
  const [volume, setVolume] = useState(
    audioElem.current ? audioElem.current.volume * 100 : 100
  );
  useEffect(() => {
    load_post(id);
    setfull(true);
    return () => {
      setfull(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const seek = (e) => {
    audioElem.current.currentTime = (e.target.value / 100) * currentSong.length;
  };
  const changeVolume = (e) => {
    let vol = e.target.value / 100;
    if (vol === 0) {
      audioElem.current.muted = true;
      setIsMuted(true);
    } else if (audioElem.current.muted) {
      audioElem.current.muted = false;
      setIsMuted(false);
    }
    setVolume(vol * 100);
    audioElem.current.volume = vol;
  };
  const mute = () => {
    if (audioElem.current.volume === 0) {
      audioElem.current.volume = 0.2;
      setVolume(20);
      audioElem.current.muted = false;
      setIsMuted(false);
    } else {
      audioElem.current.muted = !audioElem.current.muted;
      setIsMuted(!isMuted);
    }
  };
  const rotate = () => {
    if (flip === '') {
      setFlip('my-rotate');
    } else {
      setFlip('');
    }
  };
  const handleLike = () => {
    if (!isAuthenticated) {
      setOpenPopup(true);
    } else {
      favorite(currentSong.id);
    }
  };
  return (
    <>
      {currentSong && (
        <div
          dir="ltr"
          className="py-16 px-4 space-y-6 text-gray-900 dark:text-gray-300 grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* left */}
          <div>
            <div
              onClick={rotate}
              className="flip-card h-64 w-64 md:w-96 md:h-96 flex hover:cursor-pointer items-center justify-center mx-auto">
              <div className={`flip-card-inner ${flip}`}>
                <div className="flip-card-front">
                  <img
                    alt="album art"
                    src={currentSong.artwork}
                    className={`rounded-xl h-64 w-64 md:w-96 md:h-96 transform transition ${
                      !isplaying ? 'grayscale scale-90' : 'scale-1'
                    }`}
                  />
                </div>
                <div className="flip-card-back text-lg overflow-y-auto">
                  <p
                    dangerouslySetInnerHTML={{ __html: post && post.lyrics }}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* right */}
          <div className="space-y-8 lg:pt-12 xl:mr-10">
            <div className="flex space-x-4 items-center">
              <div className="w-full text-center">
                <p className=" font-bold text-xl">{currentSong.title}</p>
                <p className="text-xl">{currentSong.artist}</p>
                <p className="text-xl">{currentSong.album}</p>
                <div className="flex justify-between -mb-2">
                  <p>
                    {currentSong.ct
                      ? Math.floor(currentSong.ct / 60) +
                        ':' +
                        Math.floor(currentSong.ct % 60)
                      : '0:0'}
                  </p>
                  <p>
                    {currentSong.length
                      ? Math.floor(currentSong.length / 60) +
                        ':' +
                        Math.floor(currentSong.length % 60)
                      : '0:0'}
                  </p>
                </div>
                <input
                  className="seekbar w-full h-1 bg-blue-200 dark:bg-slate-600 appearance-none rounded"
                  min={0}
                  max={100}
                  value={currentSong.progress ? currentSong.progress : 0}
                  type="range"
                  onChange={seek}
                />
              </div>
            </div>
            <div className="flex justify-center">
              <SkipPrevious
                fontSize="large"
                className={`hover:cursor-pointer ${
                  now_playing_count < 1 && 'text-gray-500'
                }`}
                onClick={skipBack}
              />
              {isplaying ? (
                <Pause
                  fontSize="large"
                  className=" hover:cursor-pointer mx-8"
                  onClick={() => setisplaying(false)}
                />
              ) : (
                <PlayArrow
                  fontSize="large"
                  className=" hover:cursor-pointer mx-8"
                  onClick={() => setisplaying(true)}
                />
              )}
              <SkipNext
                fontSize="large"
                className={`hover:cursor-pointer ${
                  now_playing_count < 1 && 'text-gray-500'
                }`}
                onClick={skiptoNext}
              />
            </div>
            <div className=" flex">
              <div className="flex flex-1  space-x-2 items-center">
                <div className=" relative inline-block">
                  <OutsideClickHandler
                    disabled={!showMore}
                    onOutsideClick={() => setShowMore(!showMore)}>
                    <MoreVert
                      fontSize="large"
                      className=" hover:cursor-pointer"
                      onClick={() => setShowMore(!showMore)}
                    />

                    <MoreMenu
                      showMore={showMore}
                      currentSong={currentSong}
                      index={currentSong.id}
                    />
                  </OutsideClickHandler>
                </div>
                {post && post.favorite ? (
                  <Favorite
                    onClick={handleLike}
                    fontSize="large"
                    className=" hover:cursor-pointer"
                  />
                ) : (
                  <FavoriteBorder
                    onClick={handleLike}
                    fontSize="large"
                    className=" hover:cursor-pointer"
                  />
                )}
                {post && (
                  <Link to={`/list/like/${post.id}`} className=" text-2xl mx-1">
                    {post.like}
                  </Link>
                )}
              </div>
              <div className="relative inline-block">
                <OutsideClickHandler
                  disabled={!showVolume}
                  onOutsideClick={() => setShowVolume(!showVolume)}>
                  {isMuted ? (
                    <VolumeOff
                      fontSize="large"
                      className=" hover:cursor-pointer"
                      onClick={() => setShowVolume(!showVolume)}
                    />
                  ) : (
                    <VolumeUp
                      fontSize="large"
                      className=" hover:cursor-pointer"
                      onClick={() => setShowVolume(!showVolume)}
                    />
                  )}
                  <VolumePopUp
                    mute={mute}
                    isMuted={isMuted}
                    volume={volume}
                    showVolume={showVolume}
                    changeVolume={changeVolume}
                  />
                </OutsideClickHandler>
              </div>
            </div>
          </div>
        </div>
      )}
      <OutsideClickHandler
        disabled={!openPopup}
        onOutsideClick={() => setOpenPopup(!openPopup)}>
        <Popup
          title={'you are not loged in!'}
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}>
          <div>
            <h1 className=" my-10">Login to your account first.</h1>
            <Link
              to="/login"
              className="py-2 px-4 text-sm font-medium text-center text-white bg-blue-600 rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
              Login
            </Link>
          </div>
        </Popup>
      </OutsideClickHandler>
    </>
  );
};

const mapStateToProps = (state) => ({
  post: state.cloud.post,
  likes: state.cloud.likes,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  now_playing_count: state.cloud.now_playing_count,
});
export default connect(mapStateToProps, {
  load_post,
  load_likes,
  favorite,
})(PlayerFull);
