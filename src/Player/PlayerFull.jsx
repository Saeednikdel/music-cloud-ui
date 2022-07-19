import {
  Favorite,
  FavoriteBorder,
  MoreVert,
  Pause,
  PlayArrow,
  SkipNext,
  SkipPrevious,
  VolumeOff,
  VolumeUp,
} from '@mui/icons-material';
import { Link, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { favorite, load_likes, load_post } from '../actions/cloud';

import MoreMenu from '../components/MoreMenu';
import OutsideClickHandler from 'react-outside-click-handler';
import Popup from '../components/Popup';
import VolumePopUp from '../components/VolumePopUp';
import { connect } from 'react-redux';
import translate from '../translate';

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
  likes,
  now_playing_count,
  isAuthenticated,
  post,
  openMenu,
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
    load_likes(id, 1);
    setfull(true);
    return () => {
      setfull(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const new_post_id = post && post.id;

  useEffect(() => {
    post && load_likes(new_post_id, 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [new_post_id]);
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
          <div className="space-y-8 lg:pt-10 xl:mr-10">
            <Link className=" text-gray-500" to={`/u/${post.user_name}`}>
              @{post.user_name}
            </Link>
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
              <div className="flex flex-1  space-x-4 items-center">
                <div className=" relative inline-block">
                  <OutsideClickHandler
                    disabled={!showMore}
                    onOutsideClick={() => setShowMore(!showMore)}>
                    <MoreVert
                      style={{ fontSize: 28 }}
                      className=" hover:cursor-pointer"
                      onClick={() => setShowMore(!showMore)}
                    />

                    <MoreMenu
                      showMore={showMore}
                      currentSong={currentSong}
                      index={currentSong.id}
                      openMenu={openMenu}
                      setShowMore={setShowMore}
                    />
                  </OutsideClickHandler>
                </div>
                {post && post.favorite ? (
                  <Favorite
                    onClick={handleLike}
                    style={{ fontSize: 28 }}
                    className=" hover:cursor-pointer"
                  />
                ) : (
                  <FavoriteBorder
                    onClick={handleLike}
                    style={{ fontSize: 28 }}
                    className=" hover:cursor-pointer"
                  />
                )}
                <Link
                  to={`/list/like/${post.id}`}
                  className="flex flex-row-reverse">
                  {likes &&
                    likes
                      .slice(0, 3)
                      .map((like) => (
                        <img
                          src={
                            like.image
                              ? like.image
                              : `${process.env.REACT_APP_API_URL}/media/placeholder-image.png`
                          }
                          className=" w-6 h-6 rounded-full border-2 border-gray-300 dark:border-gray-700 object-cover"
                          style={{ marginLeft: likes.length > 1 && -8 }}
                        />
                      ))}
                </Link>
                {post && (
                  <Link to={`/list/like/${post.id}`} className=" text-xl mx-1">
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
                      style={{ fontSize: 28 }}
                      className=" hover:cursor-pointer"
                      onClick={() => setShowVolume(!showVolume)}
                    />
                  ) : (
                    <VolumeUp
                      style={{ fontSize: 28 }}
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
          title="you are not loged in!"
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}>
          <div>
            <h1 className=" my-10">{translate('please log in or sign up')}</h1>
            <Link
              to="/login"
              className="py-2 px-4 text-sm font-medium text-center text-white bg-blue-600 rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
              {translate('log in')}
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
