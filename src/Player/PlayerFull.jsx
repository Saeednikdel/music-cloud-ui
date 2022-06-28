import React, { useRef, useState } from 'react';
import {
  PlayArrow,
  Pause,
  SkipNext,
  SkipPrevious,
  VolumeOff,
  VolumeUp,
  ArrowBack,
  VolumeDown,
} from '@mui/icons-material';

const PlayerFull = ({
  audioElem,
  isplaying,
  setisplaying,
  currentSong,
  skipBack,
  skiptoNext,
  setFullPlayer,
}) => {
  const seekRef = useRef();
  const volumeRef = useRef();
  const [flip, setFlip] = useState('');
  const [showVolume, setShowVolume] = useState(false);

  const PlayPause = () => {
    setisplaying(!isplaying);
  };

  const seek = (e) => {
    let width = seekRef.current.clientWidth;
    const offset = e.nativeEvent.offsetX;
    const divprogress = (offset / width) * 100;
    audioElem.current.currentTime = (divprogress / 100) * currentSong.length;
  };
  const volume = (e) => {
    let width = volumeRef.current.clientWidth;
    const offset = e.nativeEvent.offsetX;
    let divvolume = offset / width;
    if (divvolume > 0.9) {
      divvolume = 1;
    }
    if (divvolume < 0.1) {
      divvolume = 0;
      audioElem.current.muted = true;
    } else if (audioElem.current.muted) {
      audioElem.current.muted = false;
    }
    audioElem.current.volume = divvolume;
  };
  const mute = () => {
    if (audioElem.current.volume === 0) {
      audioElem.current.volume = 0.2;
      audioElem.current.muted = false;
    } else {
      audioElem.current.muted = !audioElem.current.muted;
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
    <div className="py-2 px-4 md:px-16 xl:px-36 2xl:px-60 space-y-6 text-gray-900 dark:text-gray-300">
      <ArrowBack
        fontSize="large"
        className=" hover:cursor-pointer"
        onClick={() => setFullPlayer(false)}
      />
      <div
        onClick={rotate}
        className="flip-card h-60 w-60 md:w-96 md:h-96 flex hover:cursor-pointer overflow-auto items-center justify-center mx-auto">
        <div className={`flip-card-inner ${flip}`}>
          <div className="flip-card-front">
            <img
              alt="album art"
              src={currentSong.cover}
              className={`rounded-xl shadow-xl h-60 w-60 md:w-96 md:h-96 transform transition ${
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
            {currentSong.title + ' - ' + currentSong.singer}
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
          <div
            className=" w-full h-1 bg-slate-300 dark:bg-slate-500 rounded-full hover:cursor-pointer"
            onClick={seek}
            ref={seekRef}>
            <div
              className="h-full w-0 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full"
              style={{ width: `${currentSong.progress + '%'}` }}></div>
          </div>
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
            onClick={PlayPause}
          />
        ) : (
          <PlayArrow
            fontSize="large"
            className=" hover:cursor-pointer"
            onClick={PlayPause}
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
          <VolumeDown
            fontSize="large"
            className=" hover:cursor-pointer"
            onClick={() => setShowVolume(!showVolume)}
          />
          <div
            className={`${
              showVolume ? 'block' : 'hidden'
            } absolute bg-white dark:bg-slate-900 border bottom-8 right-0 border-gray-300 dark:border-gray-600 mb-2 p-3 rounded-lg z-10 bo`}>
            <div className="flex space-x-4 justify-end items-center">
              <div
                className=" w-28 h-1 bg-slate-300 dark:bg-slate-500 rounded-full hover:cursor-pointer"
                onClick={volume}
                ref={volumeRef}>
                <div
                  className="h-full w-0 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full"
                  style={{
                    width: `${
                      audioElem.current && audioElem.current.volume * 100 + '%'
                    }`,
                  }}></div>
              </div>

              {audioElem.current && audioElem.current.muted ? (
                <VolumeUp
                  fontSize="large"
                  className=" hover:cursor-pointer"
                  onClick={mute}
                />
              ) : (
                <VolumeOff
                  fontSize="large"
                  className=" hover:cursor-pointer"
                  onClick={mute}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerFull;
