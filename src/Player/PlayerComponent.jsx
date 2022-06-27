import React, { useRef } from 'react';
import {
  PlayArrow,
  Pause,
  SkipNext,
  SkipPrevious,
  VolumeOff,
  VolumeUp,
} from '@mui/icons-material';

const PlayerComponent = ({
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
  return (
    <div className="py-2 px-4 md:px-16 xl:px-36 2xl:px-60 backdrop-blur-2xl  backdrop-brightness-200 dark:backdrop-brightness-50 shadow-sm border-1 text-center text-gray-900 dark:text-gray-300">
      <div className="flex space-x-4 items-center">
        <div className="h-20 w-20 flex items-center justify-center">
          <img
            alt="album art"
            onClick={() => setFullPlayer(true)}
            src={currentSong.cover}
            className={`rounded shadow-xl transform transition hover:cursor-pointer ${
              !isplaying ? 'grayscale scale-90' : 'scale-1'
            }`}
          />
        </div>
        <div className="w-full">
          <p className=" font-bold">
            {currentSong.title + ' - ' + currentSong.singer}
          </p>

          <div className=" flex text-sm  justify-between">
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
          <div className="flex justify-between mt-2 ">
            <div className="flex space-x-4">
              <SkipPrevious
                className=" hover:cursor-pointer"
                onClick={skipBack}
              />
              {isplaying ? (
                <Pause className=" hover:cursor-pointer" onClick={PlayPause} />
              ) : (
                <PlayArrow
                  className=" hover:cursor-pointer"
                  onClick={PlayPause}
                />
              )}
              <SkipNext
                className=" hover:cursor-pointer"
                onClick={skiptoNext}
              />
            </div>
            <div className="flex space-x-1 justify-center items-center">
              <div
                className=" w-24 h-1 bg-slate-300 dark:bg-slate-500 rounded-full hover:cursor-pointer"
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
                <VolumeUp className=" hover:cursor-pointer" onClick={mute} />
              ) : (
                <VolumeOff className=" hover:cursor-pointer" onClick={mute} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerComponent;
