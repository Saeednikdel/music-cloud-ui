import React, { useState } from 'react';
import {
  PlayArrow,
  Pause,
  SkipNext,
  SkipPrevious,
  VolumeOff,
  VolumeUp,
} from '@mui/icons-material';
import OutsideClickHandler from 'react-outside-click-handler';

const PlayerFull = ({
  audioElem,
  isplaying,
  setisplaying,
  currentSong,
  skipBack,
  skiptoNext,
}) => {
  const [flip, setFlip] = useState('');
  const [showVolume, setShowVolume] = useState(false);
  const [isMuted, setIsMuted] = useState(
    audioElem.current && audioElem.current.muted
  );
  const [volume, setVolume] = useState(
    audioElem.current && audioElem.current.volume * 100
  );

  const seek = (e) => {
    audioElem.current.currentTime = (e.target.value / 100) * currentSong.length;
  };
  const changeVolume = (e) => {
    let vol = e.target.value / 100;
    if (vol > 0.9) {
      vol = 1;
    }
    if (vol < 0.1) {
      vol = 0;
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
  return (
    <div className="pt-16 px-4 md:px-16 xl:px-36 2xl:px-60 space-y-8 text-gray-900 dark:text-gray-300">
      <div
        onClick={rotate}
        className="flip-card h-64 w-64 md:w-96 md:h-96 flex hover:cursor-pointer overflow-auto items-center justify-center mx-auto">
        <div className={`flip-card-inner ${flip}`}>
          <div className="flip-card-front">
            <img
              alt="album art"
              src={currentSong.artwork[0].src}
              className={`rounded-xl shadow-xl h-64 w-64 md:w-96 md:h-96 transform transition ${
                !isplaying ? 'grayscale scale-90' : 'scale-1'
              }`}
            />
          </div>
          <div className="flip-card-back text-lg">
            <p dangerouslySetInnerHTML={{ __html: currentSong.lyrics }} />
          </div>
        </div>
      </div>
      <div className="flex space-x-4 items-center">
        <div className="w-full text-center">
          <p className=" font-bold text-xl">
            {currentSong.title + ' - ' + currentSong.artist}
          </p>

          <div className="flex justify-between">
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
            className="w-full h-1 bg-blue-200 dark:bg-slate-600 appearance-none rounded"
            min={0}
            max={100}
            value={currentSong.progress}
            type="range"
            onChange={seek}
          />
        </div>
      </div>
      <div className="flex justify-center space-x-12">
        <SkipPrevious
          fontSize="large"
          className=" hover:cursor-pointer"
          onClick={skipBack}
        />
        {isplaying ? (
          <Pause
            fontSize="large"
            className=" hover:cursor-pointer"
            onClick={() => setisplaying(false)}
          />
        ) : (
          <PlayArrow
            fontSize="large"
            className=" hover:cursor-pointer"
            onClick={() => setisplaying(true)}
          />
        )}
        <SkipNext
          fontSize="large"
          className=" hover:cursor-pointer"
          onClick={skiptoNext}
        />
      </div>
      <div className=" flex justify-end">
        <div className=" relative inline-block">
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
            <div
              className={`${
                showVolume ? 'block' : 'hidden'
              } absolute bg-white dark:bg-slate-900 border bottom-8 right-0 border-gray-300 dark:border-gray-600 mb-2 p-3 rounded-lg z-10 shadow-lg`}>
              <div className="flex space-x-4 justify-end items-center">
                <input
                  className="h-1 w-32 bg-blue-200 dark:bg-slate-600 appearance-none rounded"
                  min={0}
                  max={100}
                  value={volume}
                  type="range"
                  onChange={changeVolume}
                />

                {isMuted ? (
                  <VolumeOff
                    fontSize="large"
                    className=" hover:cursor-pointer"
                    onClick={mute}
                  />
                ) : (
                  <VolumeUp
                    fontSize="large"
                    className=" hover:cursor-pointer"
                    onClick={mute}
                  />
                )}
              </div>
            </div>
          </OutsideClickHandler>
        </div>
      </div>
    </div>
  );
};

export default PlayerFull;
