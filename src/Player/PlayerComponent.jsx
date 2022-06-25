import React, { useRef } from 'react';
import {
  PlayIcon,
  PauseIcon,
  FastForwardIcon,
  RewindIcon,
  VolumeUpIcon,
  VolumeOffIcon,
  PlusIcon,
  MinusIcon,
} from '@heroicons/react/solid';
const PlayerComponent = ({
  audioElem,
  isplaying,
  setisplaying,
  currentSong,
  skipBack,
  skiptoNext,
}) => {
  const clickRef = useRef();

  const PlayPause = () => {
    setisplaying(!isplaying);
  };

  const checkWidth = (e) => {
    let width = clickRef.current.clientWidth;
    const offset = e.nativeEvent.offsetX;
    const divprogress = (offset / width) * 100;
    audioElem.current.currentTime = (divprogress / 100) * currentSong.length;
  };

  const volumeUp = () => {
    if (audioElem.current.volume < 1) audioElem.current.volume += 0.1;
  };
  const volumeDown = () => {
    if (audioElem.current.volume > 0.1) audioElem.current.volume -= 0.1;
  };
  const mute = () => {
    audioElem.current.muted = !audioElem.current.muted;
  };
  return (
    <div className="py-8 px-6 bg-gradient-to-r from-slate-700 to-slate-800 text-center">
      <div className="flex space-x-6 items-center">
        <div className="h-20 w-20 flex items-center justify-center">
          <img
            onClick={PlayPause}
            src={currentSong.cover}
            className={`rounded shadow-xl transform transition hover:cursor-pointer ${
              !isplaying ? 'grayscale scale-90' : 'scale-1'
            }`}
          />
        </div>
        <div className="w-full">
          <p className=" text-lg text-white">{currentSong.title}</p>
          <p className=" text-base text-gray-400">{currentSong.singer}</p>
          <div className=" flex text-sm text-white justify-between">
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
            className=" w-full h-1 flex items-center bg-slate-400 rounded-full hover:cursor-pointer"
            onClick={checkWidth}
            ref={clickRef}>
            <div
              className="h-full w-0 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full"
              style={{ width: `${currentSong.progress + '%'}` }}></div>
            <div className="bg-white w-4 h-4 -ml-2 shadow-lg rounded-full"></div>
          </div>
          <div className="flex justify-between mt-4 text-white">
            <div className="flex space-x-1">
              <RewindIcon
                className="w-10 h-10 hover:cursor-pointer active:text-cyan-400"
                onClick={skipBack}
              />
              {isplaying ? (
                <PauseIcon
                  className="w-10 h-10 hover:cursor-pointer active:text-cyan-400"
                  onClick={PlayPause}
                />
              ) : (
                <PlayIcon
                  className="w-10 h-10 hover:cursor-pointer active:text-cyan-400"
                  onClick={PlayPause}
                />
              )}
              <FastForwardIcon
                className="w-10 h-10 hover:cursor-pointer active:text-cyan-400"
                onClick={skiptoNext}
              />
            </div>
            <div className="flex space-x-1">
              <p
                className={`text-2xl ${
                  audioElem.current && audioElem.current.muted && 'line-through'
                }`}>
                {audioElem.current
                  ? Math.floor(audioElem.current.volume * 100)
                  : '100'}
              </p>
              <PlusIcon
                className="w-10 h-10 hover:cursor-pointer active:text-cyan-400"
                onClick={volumeUp}
              />
              <MinusIcon
                className="w-10 h-10 hover:cursor-pointer active:text-cyan-400"
                onClick={volumeDown}
              />
              {audioElem.current && audioElem.current.volume < 0.1 ? (
                <VolumeOffIcon
                  className="w-10 h-10 hover:cursor-pointer active:text-cyan-400"
                  onClick={mute}
                />
              ) : audioElem.current && audioElem.current.muted ? (
                <VolumeOffIcon
                  className="w-10 h-10 hover:cursor-pointer active:text-cyan-400"
                  onClick={mute}
                />
              ) : (
                <VolumeUpIcon
                  className="w-10 h-10 hover:cursor-pointer active:text-cyan-400"
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

export default PlayerComponent;
